-- seed tables with data --
INSERT INTO department (id, department_name)
VALUES  (1, "Management"),
        (2, "Asset Management"),
        (3, "Business Development"),
        (4, "Creative Services"),
        (5, "Engineering"),
        (6, "Information Technology"),
        (7, "Marketing"),
        (8, "Customer Service");

       
INSERT INTO roles (id, title, salary, department_id)
VALUES  (01, "CEO", 150000, 1),
        (02, "Marketing manager", 90000, 7),
        (03, "Project manager", 85000, 4),
        (04, "Executive assistant", 60000, 3),
        (05, "Business analyst", 88000, 3),
        (06, "Sales rep", 45000, 8),
        (07, "Customer service rep", 45000, 8);

INSERT INTO employee (id, first_name, last_name, roles_id, manager_id)
VALUES  (001, "Zanthee", "Human", 01, NULL),
        (002, "Suzie", "Sparkles", 02, 001),
        (003, "Kirsty", "Kringle", 03, 001),
        (004, "Elmar", "Elsty", 04, 001),
        (005, "Gurpreet", "Kaur", 05, 003),
        (006, "Stephen", "Grampopolous", 06, 003),
        (007, "Barry", "Smith", 07, 002),
        (008, "Harriet", "Wendel", 07, 002);

