module.exports = {
  preExisting(){
    return  [
      { label: '', value: '' },
      { label: 'bloating', value: 'bloating' },
      { label: 'drowsiness', value: 'drowsiness' },
      { label: 'heart burn', value: 'heart burn' },
      { label: 'gas', value: 'gas' },
      { label: 'vomiting', value: 'vomiting' },
      { label: 'nausea', value: 'nausea' },
      { label: 'diarrhea', value: 'diarrhea' },
      { label: 'migraines', value: 'migraines' },
      { label: 'constipation', value: 'constipation' },
      { label: 'irritability', value: 'irritability' },
      { label: 'twitching muscles', value: 'twitching muscles' },
      { label: 'headaches', value: 'headaches' }, 
      { label: 'congestion', value: 'congestion' },
      { label: 'hives', value: 'hives' },
      { label: 'vertigo', value: 'vertigo' },
      { label: 'cough', value: 'cough' },
      { label: 'swollen tongue', value: 'swollen tongue' },
      { label: 'nightmares',  value: 'nightmares' }
    ];
  },
  getUserEvents(){
    return {
      username:'testUser',
      display_name:'Jim Carey',
      events: 
        [
          {
            name:'Lunch',
            type: 'meal', 
            items: [
              {
                name: 'hamburger',
                ingredients: ['wheat', 'beef', 'salt', 'spices']
              },
              {
                name: 'fries',
                ingredients: ['palm oil', 'potato', 'salt']
              }
            ],
            time: 2134234
          }, 
          {
            type: 'symptom', 
            name: 'bloating', 
            severity: 'HIGH', 
            time: Date.now()
          }
        ],
        symptoms: ['bloating', 'headaches']
    }
  }

}