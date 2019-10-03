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
      { label: 'migraines', value: 'migraines'},
      { label: }
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