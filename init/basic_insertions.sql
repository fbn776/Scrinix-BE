INSERT INTO College
VALUES ('KTE', 'Rajiv Gandhi Institute of Technology, Kottayam');

INSERT INTO Course VALUES
                       (1, 2019, 'Linear Algebra And Calculus', 'MAT101'),
                       (1, 2019, 'Engineering Chemistry', 'CYT100'),
                       (1, 2019, 'Engineering Graphics', 'EST110'),
                       (1, 2019, 'Basics Of Civil & Mechanical Engineering', 'EST120'),
                       (1, 2019, 'Engineering Physics Lab', 'PHL120'),
                       (1, 2019, 'Life Skills', 'HUN101');

INSERT INTO Course VALUES
                       (2, 2019, 'Vector Calculus, Differential Equations And Transforms', 'MAT102'),
                       (2, 2019, 'Engineering Mechanics', 'EST100'),
                       (2, 2019, 'Basics Of Electrical & Electronics Engineering', 'EST130'),
                       (2, 2019, 'Professional Communication', 'HUN102'),
                       (2, 2019, 'Programming In C', 'EST102'),
                       (2, 2019, 'Engineering Chemistry Lab', 'CYL120'),
                       (2, 2019, 'Civil & Mechanical Workshop', 'ESL120'),
                       (2, 2019, 'Electrical & Electronics Workshop', 'ESL130');

INSERT INTO Course VALUES
                       (3, 2019, 'Discrete Mathematical Structures', 'MAT203'),
                       (3, 2019, 'Data Structures', 'CST201'),
                       (3, 2019, 'Logic System Design', 'CST203'),
                       (3, 2019, 'Object Oriented Programming Using Java', 'CST205'),
                       (3, 2019, 'Design And Engineering', 'EST200'),
                       (3, 2019, 'Professional Ethics', 'HUT200'),
                       (3, 2019, 'Sustainable Engineering', 'MCN201'),
                       (3, 2019, 'Data Structures Lab', 'CSL201'),
                       (3, 2019, 'Object Oriented Programming Lab (In Java)', 'CSL203');

INSERT INTO Course VALUES
                       (4, 2019, 'Graph Theory', 'MAT206'),
                       (4, 2019, 'Computer Organisation And Architecture', 'CST202'),
                       (4, 2019, 'Database Management Systems', 'CST204'),
                       (4, 2019, 'Operating Systems', 'CST206'),
                       (4, 2019, 'Design And Engineering', 'EST200'),
                       (4, 2019, 'Professional Ethics', 'HUT200'),
                       (4, 2019, 'Constitution Of India', 'MCN202'),
                       (4, 2019, 'Digital Lab', 'CSL202'),
                       (4, 2019, 'Operating Systems Lab', 'CSL204');

INSERT INTO Course VALUES
                       (5, 2019, 'Formal Languages And Automata Theory', 'CST301'),
                       (5, 2019, 'Computer Networks', 'CST303'),
                       (5, 2019, 'System Software', 'CST305'),
                       (5, 2019, 'Microprocessors And Microcontrollers', 'CST307'),
                       (5, 2019, 'Management Of Software Systems', 'CST309'),
                       (5, 2019, 'Disaster Management', 'MCN301'),
                       (5, 2019, 'System Software And Microprocessors Lab', 'CSL331'),
                       (5, 2019, 'Database Management Systems Lab', 'CSL333');

INSERT INTO Course VALUES
                       (6, 2019, 'Compiler Design', 'CST302'),
                       (6, 2019, 'Computer Graphics And Image Processing', 'CST304'),
                       (6, 2019, 'Algorithm Analysis And Design', 'CST306'),
                       (6, 2019, 'Elective - I', 'SUB1'),
                       (6, 2019, 'Industrial Economics And Foreign Trade', 'HUT300'),
                       (6, 2019, 'Comprehensive Course Work', 'CST308'),
                       (6, 2019, 'Networking Lab', 'CSL332'),
                       (6, 2019, 'Miniproject', 'CSD334');

INSERT INTO Course VALUES
                       (7, 2019, 'Artificial Intelligence', 'CST401'),
                       (7, 2019, 'Elective - II', 'SUB2'),
                       (7, 2019, 'Elective - Open', 'SUB3'),
                       (7, 2019, 'Industrial Safety Engineering', 'MCN401'),
                       (7, 2019, 'Compiler Lab', 'CSL411'),
                       (7, 2019, 'Seminar', 'CSQ413'),
                       (7, 2019, 'Project Phase I', 'CSD415');

INSERT INTO Course VALUES
                       (8, 2019, 'Distributed Computing', 'CST402'),
                       (8, 2019, 'Elective - III', 'SUB4'),
                       (8, 2019, 'Elective - IV', 'SUB5'),
                       (8, 2019, 'Elective - V', 'SUB6'),
                       (8, 2019, 'Comprehensive Course Viva', 'CST404'),
                       (8, 2019, 'Project Phase II', 'CSD416');

/*
CREATE TABLE IF NOT EXISTS Faculty
(
    F_ID  VARCHAR(10),
    ClgID VARCHAR(10),
    Name  VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone VARCHAR(10)  NOT NULL,

    PRIMARY KEY (F_ID, ClgID),
    FOREIGN KEY (ClgID) REFERENCES College (ID) ON UPDATE CASCADE ON DELETE CASCADE
);
 */

INSERT INTO Faculty VALUES
                        ('F001', 'KTE', 'John Smith', 'john.smith@example.edu', '1234567890'),
                        ('F002', 'KTE', 'Michael Johnson', 'michael.johnson@example.edu', '2345678901'),
                        ('F003', 'KTE', 'Jessica Brown', 'jessica.brown@example.edu', '3456789012'),
                        ('F004', 'KTE', 'Daniel Miller', 'daniel.miller@example.edu', '4567890123'),
                        ('F005', 'KTE', 'Emily Wilson', 'emily.wilson@example.edu', '5678901234'),
                        ('F006', 'KTE', 'Sarah Moore', 'sarah.moore@example.edu', '6789012345'),
                        ('F007', 'KTE', 'James Taylor', 'james.taylor@example.edu', '7890123456'),
                        ('F008', 'KTE', 'Elizabeth Anderson', 'elizabeth.anderson@example.edu', '8901234567'),
                        ('F009', 'KTE', 'David Thomas', 'david.thomas@example.edu', '9012345678'),
                        ('F010', 'KTE', 'Jennifer Martinez', 'jennifer.martinez@example.edu', '0123456789');


-- Semester 1
INSERT INTO Teaches VALUES ('F001', 'KTE', 'MAT101', 2019);
INSERT INTO Teaches VALUES ('F002', 'KTE', 'PHT100', 2019);
INSERT INTO Teaches VALUES ('F003', 'KTE', 'CYT100', 2019);
INSERT INTO Teaches VALUES ('F004', 'KTE', 'EST100', 2019);
INSERT INTO Teaches VALUES ('F005', 'KTE', 'EST110', 2019);
INSERT INTO Teaches VALUES ('F006', 'KTE', 'EST120', 2019);
INSERT INTO Teaches VALUES ('F007', 'KTE', 'EST130', 2019);
INSERT INTO Teaches VALUES ('F008', 'KTE', 'HUN101', 2019);
INSERT INTO Teaches VALUES ('F009', 'KTE', 'PHL120', 2019);
INSERT INTO Teaches VALUES ('F010', 'KTE', 'CYL120', 2019);
INSERT INTO Teaches VALUES ('F001', 'KTE', 'ESL120', 2019);
INSERT INTO Teaches VALUES ('F002', 'KTE', 'ESL130', 2019);

-- Semester 2
INSERT INTO Teaches VALUES ('F003', 'KTE', 'MAT102', 2019);
INSERT INTO Teaches VALUES ('F004', 'KTE', 'PHT100', 2019);
INSERT INTO Teaches VALUES ('F005', 'KTE', 'CYT100', 2019);
INSERT INTO Teaches VALUES ('F006', 'KTE', 'EST100', 2019);
INSERT INTO Teaches VALUES ('F007', 'KTE', 'EST110', 2019);
INSERT INTO Teaches VALUES ('F008', 'KTE', 'EST120', 2019);
INSERT INTO Teaches VALUES ('F009', 'KTE', 'EST130', 2019);
INSERT INTO Teaches VALUES ('F010', 'KTE', 'HUN102', 2019);
INSERT INTO Teaches VALUES ('F001', 'KTE', 'EST102', 2019);
INSERT INTO Teaches VALUES ('F002', 'KTE', 'PHL120', 2019);
INSERT INTO Teaches VALUES ('F003', 'KTE', 'CYL120', 2019);
INSERT INTO Teaches VALUES ('F004', 'KTE', 'ESL120', 2019);
INSERT INTO Teaches VALUES ('F005', 'KTE', 'ESL130', 2019);

-- Semester 3
INSERT INTO Teaches VALUES ('F006', 'KTE', 'MAT203', 2019);
INSERT INTO Teaches VALUES ('F007', 'KTE', 'CST201', 2019);
INSERT INTO Teaches VALUES ('F008', 'KTE', 'CST203', 2019);
INSERT INTO Teaches VALUES ('F009', 'KTE', 'CST205', 2019);
INSERT INTO Teaches VALUES ('F010', 'KTE', 'EST200', 2019);
INSERT INTO Teaches VALUES ('F001', 'KTE', 'HUT200', 2019);
INSERT INTO Teaches VALUES ('F002', 'KTE', 'MCN201', 2019);
INSERT INTO Teaches VALUES ('F003', 'KTE', 'CSL201', 2019);
INSERT INTO Teaches VALUES ('F004', 'KTE', 'CSL203', 2019);

-- Semester 4
INSERT INTO Teaches VALUES ('F005', 'KTE', 'MAT206', 2019);
INSERT INTO Teaches VALUES ('F006', 'KTE', 'CST202', 2019);
INSERT INTO Teaches VALUES ('F007', 'KTE', 'CST204', 2019);
INSERT INTO Teaches VALUES ('F008', 'KTE', 'CST206', 2019);
INSERT INTO Teaches VALUES ('F009', 'KTE', 'EST200', 2019);
INSERT INTO Teaches VALUES ('F010', 'KTE', 'HUT200', 2019);
INSERT INTO Teaches VALUES ('F001', 'KTE', 'MCN202', 2019);
INSERT INTO Teaches VALUES ('F002', 'KTE', 'CSL202', 2019);
INSERT INTO Teaches VALUES ('F003', 'KTE', 'CSL204', 2019);

-- Semester 5
INSERT INTO Teaches VALUES ('F004', 'KTE', 'CST301', 2019);
INSERT INTO Teaches VALUES ('F005', 'KTE', 'CST303', 2019);
INSERT INTO Teaches VALUES ('F006', 'KTE', 'CST305', 2019);
INSERT INTO Teaches VALUES ('F007', 'KTE', 'CST307', 2019);
INSERT INTO Teaches VALUES ('F008', 'KTE', 'CST309', 2019);
INSERT INTO Teaches VALUES ('F009', 'KTE', 'MCN301', 2019);
INSERT INTO Teaches VALUES ('F010', 'KTE', 'CSL331', 2019);
INSERT INTO Teaches VALUES ('F001', 'KTE', 'CSL333', 2019);

-- Semester 6
INSERT INTO Teaches VALUES ('F002', 'KTE', 'CST302', 2019);
INSERT INTO Teaches VALUES ('F003', 'KTE', 'CST304', 2019);
INSERT INTO Teaches VALUES ('F004', 'KTE', 'CST306', 2019);
INSERT INTO Teaches VALUES ('F005', 'KTE', 'SUB1', 2019);
INSERT INTO Teaches VALUES ('F006', 'KTE', 'HUT300', 2019);
INSERT INTO Teaches VALUES ('F007', 'KTE', 'CST308', 2019);
INSERT INTO Teaches VALUES ('F008', 'KTE', 'CSL332', 2019);
INSERT INTO Teaches VALUES ('F009', 'KTE', 'CSD334', 2019);

-- Semester 7
INSERT INTO Teaches VALUES ('F010', 'KTE', 'CST401', 2019);
INSERT INTO Teaches VALUES ('F001', 'KTE', 'SUB2', 2019);
INSERT INTO Teaches VALUES ('F002', 'KTE', 'SUB3', 2019);
INSERT INTO Teaches VALUES ('F003', 'KTE', 'MCN401', 2019);
INSERT INTO Teaches VALUES ('F004', 'KTE', 'CSL411', 2019);
INSERT INTO Teaches VALUES ('F005', 'KTE', 'CSQ413', 2019);
INSERT INTO Teaches VALUES ('F006', 'KTE', 'CSD415', 2019);

-- Semester 8
INSERT INTO Teaches VALUES ('F007', 'KTE', 'CST402', 2019);
INSERT INTO Teaches VALUES ('F008', 'KTE', 'SUB4', 2019);
INSERT INTO Teaches VALUES ('F009', 'KTE', 'SUB5', 2019);
INSERT INTO Teaches VALUES ('F010', 'KTE', 'SUB6', 2019);
INSERT INTO Teaches VALUES ('F001', 'KTE', 'CST404', 2019);
INSERT INTO Teaches VALUES ('F002', 'KTE', 'CSD416', 2019);
