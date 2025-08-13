const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function importSymptoms() {
  const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017/symptomsdb');
  
  try {
    await client.connect();
    const db = client.db('symptomsdb');
    const collection = db.collection('symptoms');
    
    await collection.deleteMany({});
    
    const enData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data-seed/en/symptoms.json'), 'utf8'));
    
    const symptoms = enData.map(item => ({
      name: item.Symptom,
      englishName: item.Symptom,
      description: item.Description,
      descriptionEn: item.Description,
      severity: item['Severity Level'] === 'Mild' ? 1 : 
                item['Severity Level'] === 'Moderate' ? 2 : 3
    }));
    
    await collection.insertMany(symptoms);
    console.log(`Imported ${symptoms.length} symptoms`);
    
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await client.close();
  }
}

importSymptoms();