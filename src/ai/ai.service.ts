import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeSymptoms(symptoms: string, locale: string, lackInformation: boolean = false): Promise<string> {
    try {
      // return `1. Nghỉ ngơi nhiều hơn để cơ thể có thể đối phó với bệnh tình.
      //   2. Uống đủ nước để duy trì sự lỏng lẻo và giúp loại bỏ độc tố khỏi cơ thể.
      //   3. Sử dụng thuốc hạ nhiệt và giảm đau như paracetamol để giảm sốt và cảm giác đau.
      //   4. Hạn chế tiếp xúc với người khác để ngăn chéo vi rút hoặc vi khuẩn cho người khác.

      //   Tuy nhiên, nếu triệu chứng của bạn trở nên nặng hơn hoặc bạn cảm thấy không khỏe hơn, bạn cần thăm khám bác sĩ ngay lập tức để được đánh giá chính xác và điều trị kịp thời.`;
      let promt = `Symptoms: ${symptoms} .Based on symptoms, suggest possible conditions. Use locale ${locale}`;
      if(lackInformation) {
        promt = `Symptoms: ${symptoms} .Based on symptoms, suggest possible conditions and give question to missing information. Be concise and professional. Use locale ${locale}.`
      };

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: promt,
          }
        ],
      });
  
      return response.choices[0]?.message?.content?.trim() || 'No result';
    } catch (err) {
      if (err.status === 429) {
        console.log('OpenAI quota exceeded. Please check your billing account.');
      }

      return "Error analyzing symptoms";
    }
  }

  async analyzeNextMessage(history: any[], locale: string, lackInformation: boolean = false): Promise<string> {
    try {
//       let promt = `History chat: ${JSON.stringify(history)}. Based on symptoms and history chat, suggest possible medical condition and next question to get more information (new information to analyze symptom, not exist information). Use locale ${locale} and Provide response in this exact format:
// Conditions: [possible medical condition - optional return if have],
// Message: [next question - required]`;
// Summary: [message summary about user symptoms use nature language as you are chatting with user - required]
      let promt = `History chat: ${JSON.stringify(history)}. Based on symptoms and history chat, suggest possible medical condition, summarry message and next question to get more information (new information to analyze symptom, not exist information). Use locale ${locale} and Provide response in this exact format:
Conditions: [possible medical condition - optional return if have]
Next question: [next question - required]`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: promt,
          }
        ],
      });
  
      const result = response.choices[0]?.message?.content?.trim() || '';
      console.log("AIII:"+result);
      const conditionMatch = result.match(/Conditions:\s*(.+?)(?=\n|$)/i);
      const questionMatch = result.match(/Next question:\s*(.+?)(?=\n|$)/i);
      const summaryMatch = result.match(/Summary:\s*(.+?)(?=\n|$)/i);

      // const condition = conditionMatch?conditionMatch[1].trim(): '';
      const question = questionMatch?questionMatch[1].trim():'';
      // const summarry = summaryMatch?summaryMatch[1].trim(): '';

      // return condition === ''?`${question}`: `${question}\n\nPossible medical conditions: ${condition}`;
      return question;
    } catch (err) {
      if (err.status === 429) {
        console.log('OpenAI quota exceeded. Please check your billing account.');
      }

      return "Error analyzing symptoms";
    }
  }

  async getConsultant(symptoms: string, locale: string): Promise<{ symptom: string; risk: string; result: string; advice: string; source: string; }> {
    try {
      const prompt = `You are a medical AI assistant. Analyze these symptoms and provide assessment.

Symptoms: ${symptoms}
Language: ${locale}

Provide response in this exact format:
Symptom: [list of symptoms]
Risk: [Mild/Moderate/Urgent/Critical]
Condition: [possible medical condition]
Advice: [medical advice in ${locale === 'VI' ? 'Vietnamese' : 'English'}]
Source: [source where have these information]

Be concise and professional.`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
      });

      const result = response.choices[0]?.message?.content?.trim() || '';
      
      const symptomMatch = result.match(/Symptom:\s*(.+?)(?=\n|$)/i);
      const riskMatch = result.match(/Risk:\s*(Mild|Moderate|Urgent|Critical)/i);
      const conditionMatch = result.match(/Condition:\s*(.+?)(?=\n|$)/i);
      const adviceMatch = result.match(/Advice:\s*(.+?)(?=\n|$)/i);
      const sourceMatch = result.match(/Source:\s*(.+?)(?=\n|$)/i);
      
      return {
        symptom: symptomMatch ? symptomMatch[1].trim() : symptoms,
        risk: riskMatch ? riskMatch[1] : 'Moderate',
        result: conditionMatch ? conditionMatch[1].trim() : 'General symptoms analysis',
        advice: adviceMatch ? adviceMatch[1].trim() : (locale === 'VI' ? 'Nên tham khảo ý kiến bác sĩ' : 'Please consult a doctor'),
        source: sourceMatch ? sourceMatch[1].trim():""
      };
    } catch (err) {
      if (err.status === 429) {
        console.log('OpenAI quota exceeded. Please check your billing account.');
      }

      return {
        symptom: symptoms,
        risk: 'Moderate',
        result: 'Unable to analyze symptoms',
        advice: locale === 'VI' ? 'Nên tham khảo ý kiến bác sĩ để được chẩn đoán chính xác' : 'Please consult a doctor for accurate diagnosis',
        source: 'OpenAI Analysis (Error Fallback)'
      };
    }
  }

//   async isConversationEnd(message: string): Promise<boolean> {
//     console.log("AAAAAAAAAA: check api");
//     const prompt = `
// You are a medical conversation assistant.
// Your task is to classify if the patient's message indicates they have finished describing their symptoms.

// Rules:
// - Answer ONLY "YES" if the message clearly signals the patient has no more symptoms to mention or has completed the symptom description.
// - Answer "NO" if the patient is still listing symptoms, adding details, asking questions, or talking about treatment.

// Examples:
// Patient: "That's everything I feel." → YES
// Patient: "I don't have any other issues." → YES
// Patient: "Also I have a mild headache." → NO
// Patient: "My temperature is 38 degrees." → NO
// Patient: "I think that's all for now." → YES
// Patient: "Could this be flu?" → NO
// Patient: "Khong con trieu chung nao nua" → YES
// Patient: "Them nua, toi bi dau lung" → NO`;

//     const res = await this.openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: prompt
//           // content:
//           //   'You are a yes/no classifier. Only answer "YES" if the message means the patient has finished describing symptoms (containt end symptom pattern), otherwise "NO".',
//         },
//         { role: 'user', content: message },
//       ],
//       max_tokens: 100,
//     });
//     const answer = res.choices[0].message.content?.trim().toLowerCase();
//     return answer === 'yes';
//   }
}