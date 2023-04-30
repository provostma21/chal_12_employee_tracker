USE employee_db;

INSERT INTO department (name)
VALUES  ("Branch Main"),
        ("Operations"),
        ("Outside Sales");

INSERT INTO role (title, salary, department_id)
VALUES  ("Branch Manager", 160000.00, 1),
        ("Assistant Branch Manager", 80000.00, 1),
        ("Operations Manager", 130000.00, 2),
        ("Bookkeeper", 60000.00, 1),
        ("Inside Sales", 50000.00, 1),
        ("Warehouse Manager", 75000.00, 2),
        ("Logistics Specialist", 60000.00, 2),
        ("Territory Manager", 60000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Patrick", "Bateman", 1, NULL),
        ("Carlos", "Hernandez", 3, 1),
        ("Fae", "Richards", 4, 1),
        ("Paul", "Walker", 5, 1),
        ("Devyn", "Torres", 5, 1),
        ("John", "Wayne", 6, 2),
        ("Jim", "Lazar", 7, 6),
        ("Michelle", "White", 7, 6),
        ("Christopher", "Snow", 7, 6),
        ("Nancy", "Padzinski", 7, 6),
        ("Tyler", "West", 8, 1),
        ("Jerome", "Nelson", 8, 1);