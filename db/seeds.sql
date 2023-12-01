-- seed tables with data --
INSERT INTO department (id, department_name)
VALUES (1, "Asset Management"),
       (2, "Business Development"),
       (3, "Creative Services"),
       (4, "Engineering"),
       (5, "Information Technology"),
       (6, "Marketing"),
       (7, "Customer Service");

       
INSERT INTO roles (id, title, salary, department_id)
VALUES (01, "Executive assistant", 60000, 2),
        (02, "Marketing manager", 90000, 6),
        (03, "Project manager", 85000, 3),
        (04, "Business analyst", 88000, 2),
        (05, "Sales rep", 45000, 6),
        (06, "Customer service rep", 45000, 7);

INSERT INTO employee (id, first_name, last_name, roles_id, manager_id)
VALUES (001, "Suzie", "Sparkles", 01, NULL),
        (002, "Kirsty", "Kringle", 02, 01),
        (003, "Elmar", "Elsty", 03, 02),
        (004, "Gurpreet", "Kaur", 04, NULL),
        (005, "Stephen", "Grampopolous", 05, NULL),
        (006, "Barry", "Smith", 05, NULL),
        (007, "Harriet", "Wendel", 06, 03);
