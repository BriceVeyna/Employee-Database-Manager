INSERT INTO department(department_name)
VALUES  ("Corporate"),
        ("Management"),
        ("Sales"),
        ("Accounting"),
        ("Human Resources"),
        ("Reception"),
        ("Warehouse");

INSERT INTO employee_role(title, salary, department_id)
VALUES  ("CFO", "400000", 1),
        ("Regional Manager", "65000", 2),
        ("Sales Representative", "70000", 3),
        ("Accountant", "55000", 4),
        ("HR Representative", "40000", 5),
        ("Receptionist", "25000", 6),
        ("Foreman", "60000", 7),
        ("Quality Assurance Representative", "40000", NULL),
        ("Customer Service Representative", "35000", NULL),
        ("Supplier Relations Representative", "60000", NULL),
        ("Temp", "35000", NULL);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("David", "Wallace", 1, NULL),
        ("Michael", "Scott", 2, NULL),
        ("Jim", "Halpert", 3, 2),
        ("Dwight", "Schrute", 3, 2),
        ("Andy", "Bernard", 3, 2),
        ("Stanley", "Hudson", 3, 2),
        ("Phyllis", "Lapin", 3, 2),
        ("Angela", "Martin", 4, 2),
        ("Oscar", "Martinez", 4, 2),
        ("Kevin", "Malone", 4, 2),
        ("Toby", "Flenderson", 5, 2),
        ("Holly", "Flax", 5, 2),
        ("Pam", "Beesly", 6, 2),
        ("Erin", "Hannon", 6, 2),
        ("Darryl", "Philbin", 7, 2),
        ("Creed", "Bratton", 8, 2),
        ("Kelly", "Kapoor", 9, 2),
        ("Meredith", "Palmer", 10, 2),
        ("Ryan", "Howard", 11, 2);