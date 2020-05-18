INSERT INTO departments (name)
VALUES ("Tech"),("Customer Service"),("Human Resources"),("Logistics"),("Merchandising"),("Accounting");

INSERT INTO roles (title,salary,department_id)
VALUES ("Junior Accountant", 60000, 6),("Data Entry Assistant", 45000, 4),("Customer Service Associate", 50000, 2),("Software Engineer", 80000, 1),("HR Manager", 85000, 3),("Catalog Associate", 60000,5),("Senior Buyer", 60000,5);

INSERT INTO employees (first_name,last_name, role_id)
VALUES ("Janice", "Johnson", 1),("Bob", "Brawnson", 2),("Andreas", "Al'Ditore", 3),("Pedro", "Poblano", 4),("Tim", "Timothy", 5),("Moe", "Morawaki", 6),("Candice", "Cook", 7),("Sam", "Short", 2);
