if (Schools.find().count() === 0) {
  Schools.insert({
   "user": "6rBSD7aAvLkobd24X",
   "school": "Lycée Châteaubriand",
   "period": "2014-2015",
   "classrooms": [
       {
           "name": "104",
           "size": {
               "width": 3,
               "height": 3
           },
           "positions": [
               1,
               2,
               3,
               4,
               5,
               7
           ]
       },
       {
           "name": "208",
           "size": {
               "width": 3,
               "height": 3
           },
           "positions": [
               1,
               5,
               8
           ]
       },
       {
           "name": "301",
           "size": {
               "width": 3,
               "height": 1
           },
           "positions": [
               1,
               2,
               3
           ]
       }
   ],
   "students": [
       {
           "fistname": "Elodie",
           "familyname": "Dupont",
           "groups": [
               "Terminal S1",
               "Spécialité Maths"
           ],
           "seats": [
               {
                   "classroom": "104",
                   "number": "3"
               },
               {
                   "classroom": "208",
                   "number": "8"
               }
           ]
       },
       {
           "fistname": "Henri",
           "familyname": "Durant",
           "groups": [
               "Seconde B"
           ],
           "seats": [
               {
                   "classroom": "301",
                   "number": "1"
               }
           ]
       },
       {
           "fistname": "Igor",
           "familyname": "Ranberg",
           "groups": [
               "Spécialités Maths"
           ],
           "seats": [
               {
                   "classroom": "104",
                   "number": "7"
               }
           ]
       }
   ]
});
 
}