let dummyData = [
    {  name: 'Debashis', score: 50 },
    {  name: 'Rohan', score: 70 },
    {  name: 'Nur', score: 80 },
    {  name: 'Rakib', score: 60 },
    {  name: 'Rashid', score: 90 }
  ];
  
  // Sort the data array by score in descending order
  dummyData.sort((a, b) => b.score - a.score);
  
  let table = document.getElementById('myTable');
  
  dummyData.forEach((item, index) => {
    let row = document.createElement('tr');
  
    let rankCell = document.createElement('td');
    rankCell.innerText = index + 1;
    // let idCell = document.createElement('td');
    // idCell.innerText = item.id;
    let nameCell = document.createElement('td');
    nameCell.innerText = item.name;
    let scoreCell = document.createElement('td');
    scoreCell.innerText = item.score;
  
    row.appendChild(rankCell);
    // row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
  
    table.appendChild(row);
  });
  