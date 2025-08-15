import { Injectable } from '@nestjs/common';
import { AnalyzeSymptomsDto } from './symptom-analysis.dto';
import { AIService } from '../ai/ai.service';
import * as symptomData from '../data-seed/symptom.json';
import * as questionData from '../data-seed/Question.json';
import * as assessmentData from '../data-seed/answer_assessment.json';

@Injectable()
export class SymptomAnalysisService {
  private cache = new Map<string, boolean>();
  private readonly useAI: boolean;

  constructor(
    private readonly aiService: AIService) {
      this.useAI = !!process.env.OPENAI_API_KEY;
    }

  private readonly END_SYMPTOM_PATTERNS = [
    // ===== English =====
    "that's all the symptoms",
    "those are all my symptoms",
    "that's everything i feel",
    "i have nothing else",
    "no other symptoms",
    "that's all i can remember",
    "i don't have any more symptoms",
    "that's all i noticed",
    "i've told you everything",
    "nothing else comes to mind",
    "i think that's it",
    "those are all the issues",
    "i'm done describing",
    "all symptoms covered",
    "that's all",

    // ===== Vietnamese =====
    "đó là tất cả triệu chứng",
    "đó là tất cả các triệu chứng",
    "hết triệu chứng rồi",
    "không còn triệu chứng nào khác",
    "tôi không còn triệu chứng nào",
    "tôi đã nói hết triệu chứng",
    "tôi nhớ được chừng đó thôi",
    "tôi đã kể hết",
    "không có gì khác nữa",
    "tôi nghĩ vậy là hết",
    "đó là tất cả",
    "xong rồi",
    "hết rồi"
  ];
  
  async analyzeSymptoms(dto: AnalyzeSymptomsDto) {
    const locale = dto.locale || 'EN';
    const userMessages = dto.chat.filter(msg => msg.user === 'user').map(msg => msg.message);
    const allMessages = dto.chat.map(msg => msg.message).join(' ');
    console.log(userMessages);
    // Check if conversation is complete
    const isCompleted = await this.isConversationComplete(userMessages, allMessages);
    
    let analyzeResult: any = null;
    let replyMessage: string | null = null;

    // Extract symptoms from user messages - data
    const detectedSymptoms = this.extractSymptoms(allMessages, locale);
    if (isCompleted) {
      // Analyze symptoms using data
      if(userMessages.length < 2 && detectedSymptoms.length > 1){
        analyzeResult = this.analyzeWithLocalData(detectedSymptoms, locale, dto.userInfo);
      }
      
      // If not enough data, use OpenAI
      if (!analyzeResult) {
        const aiAnalysis = await this.aiService.getConsultant(allMessages, locale);
        analyzeResult = this.formatAIResult(aiAnalysis, locale);
      }
      replyMessage = analyzeResult;
    } else {
      // Generate follow-up question
      replyMessage = await this.generateFollowUpQuestion(dto.chat, allMessages, userMessages, detectedSymptoms, locale);
    }

    return {
      isCompleted,
      analyzeResult,
      replyMessage
    };
  }

  private extractSymptoms(text: string, locale: string): any[] {
    const symptoms: any[] = [];
    const lowerText = text.toLowerCase();
    
    for (const symptom of symptomData as any[]) {
      const symptomName = locale === 'VI' ? symptom['Symptom (VI)'] : symptom['Symptom (EN)'];
      if (lowerText.includes(symptomName.toLowerCase())) {
        symptoms.push(symptom);
      }
    }
    
    return symptoms;
  }

  private async isConversationComplete(userMessages: string[], allMessages: string): Promise<boolean> {
    if (userMessages.length < 1) {
      return false;
    }

    const normalized = userMessages[userMessages.length-1].toLowerCase().trim();

    // 1. Check cache
    if (this.cache.has(normalized)) {
      return this.cache.get(normalized)!;
    }

    let isEnded = false;
    // 2. Rule-based first
    if (this.checkRuleBasedCompletion(normalized)) {
      isEnded = true;
    }
    
    // else if (this.useAI) {
    //   // 3. AI fallback
    //   isEnded = await this.aiService.isConversationEnd(normalized);
    //   // isEnded = await this.checkAIBasedCompletion(allMessages);
    // }

    // 4. Cache result
    this.cache.set(normalized, isEnded);

    return isEnded;
  }

  private checkRuleBasedCompletion(lastMessages: string): boolean {
    // Minimum requirements
    // if (userMessages.length < 1) {
    //   return false;
    // }
    
    // Check for comprehensive symptom coverage
    // const hasMainSymptom = symptoms.length >= 1;
    // const hasDetailedConversation = userMessages.length >= 1;
    // const hasSymptomDetails = userMessages.some(msg => 
    //   msg.length > 10 && (msg.includes('day') || msg.includes('hour') || msg.includes('severe') || msg.includes('mild'))
    // );
    
    // return hasMainSymptom && (hasDetailedConversation || hasSymptomDetails);
    return this.END_SYMPTOM_PATTERNS.some(pattern => lastMessages.includes(pattern));
  }

//   private async checkAIBasedCompletion(allMessages: string): Promise<boolean> {
//     try {
//       const prompt = `Analyze this medical conversation and determine if enough information has been gathered for a preliminary assessment. 

// Conversation: ${allMessages}

// Respond with only 'COMPLETE' if sufficient symptom information is available for analysis, or 'INCOMPLETE' if more questions are needed.`;
      
//       const aiResponse = await this.aiService.analyzeSymptoms(prompt);
//       return aiResponse.toLowerCase().includes('complete');
//     } catch (error) {
//       // Fallback to rule-based if AI fails
//       return true;
//     }
//   }

// todo: viết lại
  private analyzeWithLocalData(symptoms: any[], locale: string, userInfo: any) {
    if (symptoms.length === 0) return null;

    // Find the highest severity symptom
    const severityOrder = { 'Critical': 4, 'Urgent': 3, 'Moderate': 2, 'Mild': 1 };
    const highestSeveritySymptom = symptoms.reduce((prev, current) => {
      const prevSeverity = severityOrder[prev['Severity Level (EN)']] || 0;
      const currentSeverity = severityOrder[current['Severity Level (EN)']] || 0;
      return currentSeverity > prevSeverity ? current : prev;
    });

    const risk = this.mapSeverityToRisk(highestSeveritySymptom['Severity Level (EN)']);
    
    return {
      symptom: symptoms.map(s => locale === 'VI' ? s['Symptom (VI)'] : s['Symptom (EN)']).join(', '),
      risk,
      result: locale === 'VI' ? highestSeveritySymptom['Possible Conditions (VI)'] : highestSeveritySymptom['Possible Conditions (EN)'],
      advice: locale === 'VI' ? highestSeveritySymptom['Recommended Action (VI)'] : highestSeveritySymptom['Recommended Action (EN)'],
      source: highestSeveritySymptom['Source']
    };
  }

  private mapSeverityToRisk(severity: string): string {
    const mapping = {
      'Critical': 'Critical',
      'Urgent': 'Urgent', 
      'Moderate': 'Moderate',
      'Mild': 'Mild'
    };
    return mapping[severity] || 'Mild';
  }

  private formatAIResult(aiResult: any, locale: string) {
    return {
      symptom: aiResult.symptom,
      risk: aiResult.risk,
      result: aiResult.condition,
      advice: aiResult.advice,
      source: aiResult.source
    };
  }

  private async generateFollowUpQuestion(historyChat: any[],  allMessages: string, userMessages: string[], symptoms: any[], locale: string): Promise<string> {
    const questions = (questionData as any)[locale.toLowerCase()];
    console.log(symptoms);
    console.log("user message:" + userMessages.length);

    if (userMessages.length >= 2 || symptoms.length === 0) {
      const nextMessage = await this.aiService.analyzeNextMessage(historyChat, locale);
      if(nextMessage && nextMessage !== "") return nextMessage;
      return locale === 'VI' ? 
        'Bạn đang gặp triệu chứng gì? Hãy mô tả chi tiết để tôi có thể hỗ trợ bạn tốt hơn.' :
        'What symptoms are you experiencing? Please describe in detail so I can better assist you.';
    }

    // Generate specific follow-up based on detected symptoms
    const symptomTypes = symptoms.map(s => s['Symptom (EN)'].toLowerCase());
    
    if (symptomTypes.some(s => s.includes('fever'))) {
      const feverQuestions = questions.fever_questions || questions.fever_related_questions;
      return feverQuestions[Math.floor(Math.random() * feverQuestions.length)];
    }
    
    if (symptomTypes.some(s => s.includes('cough') || s.includes('breath'))) {
      const respQuestions = questions.respiratory_questions;
      return respQuestions[Math.floor(Math.random() * respQuestions.length)];
    }
    
    if (symptomTypes.some(s => s.includes('pain'))) {
      const painQuestions = questions.pain_questions || questions.pain_assessment_questions;
      return painQuestions[Math.floor(Math.random() * painQuestions.length)];
    }

    // Default follow-up
    const generalQuestions = questions.symptom_questions || questions.general_symptoms;
    return generalQuestions[Math.floor(Math.random() * generalQuestions.length)];
  }
}