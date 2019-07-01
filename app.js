const companies= [
    {name: "Company One", category: "Finance", start: 1981, end: 2004},
    {name: "Company Two", category: "Retail", start: 1992, end: 2008},
    {name: "Company Three", category: "Auto", start: 1999, end: 2007},
    {name: "Company Four", category: "Retail", start: 1989, end: 2010},
    {name: "Company Five", category: "Technology", start: 2009, end: 2014},
    {name: "Company Six", category: "Finance", start: 1987, end: 2010},
    {name: "Company Seven", category: "Auto", start: 1986, end: 1996},
    {name: "Company Eight", category: "Technology", start: 2011, end: 2016},
    {name: "Company Nine", category: "Retail", start: 1981, end: 1989}
  ];
  
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
  
//   for(let i = 0; i<companies.length; i++)
//   {
//       console.log(companies[i].name + " " + companies[i].category);
//   }

companies.forEach((company, index, companies)=>{
    console.log(company.start);
});

// let newCompanies = companies.filter(function(company){
//     if(company.start >= 1999){
//         return true;
//     }
// });

let newCompanies  = companies.filter( (company) => company.start >= 1999 );

console.log(newCompanies);

let companyNames = companies.map((company)=> {
    return company.name;
});

console.log(companyNames);

let newCompanyFormates = companies.map( (company)=> `${company.name} [${company.start} - ${company.end}]` );

console.log(newCompanyFormates);

let sortedCompanies = companies.sort( (c1,c2) => (c1.start > c2.start ? 1 : -1) );
sortedCompanies = companies.sort( (c1,c2) => (c1.start - c2.start) );
// sortedCompanies = companies.sort( (c1,c2) => (c1.start > c2.start ? 1 : -1) ).map( (c) => c.start );

console.log("sortedCompanies",sortedCompanies);

let sortAges = ages.sort((a,b) => a-b);
console.log(sortAges);

const ageSum = ages.reduce( (total, age) => total+age, 0 );
console.log(ageSum);

const totalYears = companies.reduce( (total, company) => total + (company.end - company.start),0 );

console.log(totalYears);



