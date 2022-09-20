 export  const requirements = [
    {re: /[0-9]/, label: 'Includes number'},
    {re: /[a-z]/, label: 'Includes lowercase letter'},
    {re: /[A-Z]/, label: 'Includes uppercase letter'},
    {re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol'},
];