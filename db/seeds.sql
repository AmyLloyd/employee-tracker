INSERT INTO department (id, department_name)
VALUES (1, "Asset Management"),
       (2, "Business Development"),
       (3, "Creative Services"),
       (4, "Engineering"),
       (5, "Information Technology"),
       (6, "Marketing"),
       (7, "Customer Service")

       
INSERT INTO role (id, title, salary, department_name)
VALUES (01, "Executive assistant", 60000, 02 ),
        (02, "Marketing manager", 90000, 06),
        (03, "Project manager", 85000, 03),
        (04, "Business analyst", 88000, 02),
        (05, "Sales representative", 45000, 06),
        (06, "Customer service representative", 45000, 07)

INSERT INTO employee (id, first_name, last_name, role_id, manager-id)
VALUES (001, Suzie, Sparkles, 01, NULL),
        (002, Kirsty, Kringle, 02, 01),
        (003, Elmar, Elsty, 03, 02),
        (004, Gurpreet, Kaur, 04, NULL),
        (005, Stephen, Grampopolous, 05, NULL),
        (006, Barry, Smith, 05, NULL),
        (007, Harriet, Wendel, 06, 03)