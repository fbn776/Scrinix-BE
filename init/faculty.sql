-- Insert data;
/*
     semester  INT,
    scheme    INT,
    course    VARCHAR(100) NOT NULL,
    course_id varchar(10),
    PRIMARY KEY (scheme, course_id)
*/

INSERT INTO Course VALUES
                       (1, 2019, "Linear Algebra And Calculus", "MAT101"),
                       (1, 2019, "Engineering Physics A", "PHT100"),
                       (1, 2019, "Engineering Chemistry", "CYT100"),
                       (1, 2019, "Engineering Mechanics", "EST100"),
                       (1, 2019, "Engineering Graphics", "EST110"),
                       (1, 2019, "Basics Of Civil & Mechanical Engineering", "EST120"),
                       (1, 2019, "Basics Of Electrical & Electronics Engineering", "EST130"),
                       (1, 2019, "Life Skills", "HUN101"),
                       (1, 2019, "Engineering Physics Lab", "PHL120"),
                       (1, 2019, "Engineering Chemistry Lab", "CYL120"),
                       (1, 2019, "Civil & Mechanical Workshop", "ESL120"),
                       (1, 2019, "Electrical & Electronics Workshop", "ESL130");

INSERT INTO Course VALUES
                       (2, 2019, "Vector Calculus, Differential Equations And Transforms", "MAT102"),
                       (2, 2019, "Engineering Physics A", "PHT100"),
                       (2, 2019, "Engineering Chemistry", "CYT100"),
                       (2, 2019, "Engineering Mechanics", "EST100"),
                       (2, 2019, "Engineering Graphics", "EST110"),
                       (2, 2019, "Basics Of Civil & Mechanical Engineering", "EST120"),
                       (2, 2019, "Basics Of Electrical & Electronics Engineering", "EST130"),
                       (2, 2019, "Professional Communication", "HUN102"),
                       (2, 2019, "Programming In C", "EST102"),
                       (2, 2019, "Engineering Physics Lab", "PHL120"),
                       (2, 2019, "Engineering Chemistry Lab", "CYL120"),
                       (2, 2019, "Civil & Mechanical Workshop", "ESL120"),
                       (2, 2019, "Electrical & Electronics Workshop", "ESL130");

INSERT INTO Course VALUES
                       (3, 2019, "Discrete Mathematical Structures", "MAT203"),
                       (3, 2019, "Data Structures", "CST201"),
                       (3, 2019, "Logic System Design", "CST203"),
                       (3, 2019, "Object Oriented Programming Using Java", "CST205"),
                       (3, 2019, "Design And Engineering", "EST200"),
                       (3, 2019, "Professional Ethics", "HUT200"),
                       (3, 2019, "Sustainable Engineering", "MCN201"),
                       (3, 2019, "Data Structures Lab", "CSL201"),
                       (3, 2019, "Object Oriented Programming Lab (In Java)", "CSL203");

INSERT INTO Course VALUES
                       (4, 2019, "Graph Theory", "MAT206"),
                       (4, 2019, "Computer Organisation And Architecture", "CST202"),
                       (4, 2019, "Database Management Systems", "CST204"),
                       (4, 2019, "Operating Systems", "CST206"),
                       (4, 2019, "Design And Engineering", "EST200"),
                       (4, 2019, "Professional Ethics", "HUT200"),
                       (4, 2019, "Constitution Of India", "MCN202"),
                       (4, 2019, "Digital Lab", "CSL202"),
                       (4, 2019, "Operating Systems Lab", "CSL204");

INSERT INTO Course VALUES
                       (5, 2019, "Formal Languages And Automata Theory", "CST301"),
                       (5, 2019, "Computer Networks", "CST303"),
                       (5, 2019, "System Software", "CST305"),
                       (5, 2019, "Microprocessors And Microcontrollers", "CST307"),
                       (5, 2019, "Management Of Software Systems", "CST309"),
                       (5, 2019, "Disaster Management", "MCN301"),
                       (5, 2019, "System Software And Microprocessors Lab", "CSL331"),
                       (5, 2019, "Database Management Systems Lab", "CSL333");

INSERT INTO Course VALUES
                       (6, 2019, "Compiler Design", "CST302"),
                       (6, 2019, "Computer Graphics And Image Processing", "CST304"),
                       (6, 2019, "Algorithm Analysis And Design", "CST306"),
                       (6, 2019, "Elective - I", "SUB1"),
                       (6, 2019, "Industrial Economics And Foreign Trade", "HUT300"),
                       (6, 2019, "Comprehensive Course Work", "CST308"),
                       (6, 2019, "Networking Lab", "CSL332"),
                       (6, 2019, "Miniproject", "CSD334");

INSERT INTO Course VALUES
                       (7, 2019, "Artificial Intelligence", "CST401"),
                       (7, 2019, "Elective - II", "SUB2"),
                       (7, 2019, "Elective - Open", "SUB3"),
                       (7, 2019, "Industrial Safety Engineering", "MCN401"),
                       (7, 2019, "Compiler Lab", "CSL411"),
                       (7, 2019, "Seminar", "CSQ413"),
                       (7, 2019, "Project Phase I", "CSD415");

INSERT INTO Course VALUES
                       (8, 2019, "Distributed Computing", "CST402"),
                       (8, 2019, "Elective - III", "SUB4"),
                       (8, 2019, "Elective - IV", "SUB5"),
                       (8, 2019, "Elective - V", "SUB6"),
                       (8, 2019, "Comprehensive Course Viva", "CST404"),
                       (8, 2019, "Project Phase II", "CSD416");

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
                        ("F001", "C001", "John Smith", "john.smith@example.edu", "1234567890"),
                        ("F002", "C001", "Michael Johnson", "michael.johnson@example.edu", "2345678901"),
                        ("F003", "C002", "Jessica Brown", "jessica.brown@example.edu", "3456789012"),
                        ("F004", "C002", "Daniel Miller", "daniel.miller@example.edu", "4567890123"),
                        ("F005", "C003", "Emily Wilson", "emily.wilson@example.edu", "5678901234"),
                        ("F006", "C003", "Sarah Moore", "sarah.moore@example.edu", "6789012345"),
                        ("F007", "C004", "James Taylor", "james.taylor@example.edu", "7890123456"),
                        ("F008", "C004", "Elizabeth Anderson", "elizabeth.anderson@example.edu", "8901234567"),
                        ("F009", "C005", "David Thomas", "david.thomas@example.edu", "9012345678"),
                        ("F010", "C005", "Jennifer Martinez", "jennifer.martinez@example.edu", "0123456789");


-- Semester 1
INSERT INTO Teaches VALUES ("F001", "C001", "MAT101", 2019);
INSERT INTO Teaches VALUES ("F002", "C001", "PHT100", 2019);
INSERT INTO Teaches VALUES ("F003", "C002", "CYT100", 2019);
INSERT INTO Teaches VALUES ("F004", "C002", "EST100", 2019);
INSERT INTO Teaches VALUES ("F005", "C003", "EST110", 2019);
INSERT INTO Teaches VALUES ("F006", "C003", "EST120", 2019);
INSERT INTO Teaches VALUES ("F007", "C004", "EST130", 2019);
INSERT INTO Teaches VALUES ("F008", "C004", "HUN101", 2019);
INSERT INTO Teaches VALUES ("F009", "C005", "PHL120", 2019);
INSERT INTO Teaches VALUES ("F010", "C005", "CYL120", 2019);
INSERT INTO Teaches VALUES ("F001", "C001", "ESL120", 2019);
INSERT INTO Teaches VALUES ("F002", "C001", "ESL130", 2019);

-- Semester 2
INSERT INTO Teaches VALUES ("F003", "C002", "MAT102", 2019);
INSERT INTO Teaches VALUES ("F004", "C002", "PHT100", 2019);
INSERT INTO Teaches VALUES ("F005", "C003", "CYT100", 2019);
INSERT INTO Teaches VALUES ("F006", "C003", "EST100", 2019);
INSERT INTO Teaches VALUES ("F007", "C004", "EST110", 2019);
INSERT INTO Teaches VALUES ("F008", "C004", "EST120", 2019);
INSERT INTO Teaches VALUES ("F009", "C005", "EST130", 2019);
INSERT INTO Teaches VALUES ("F010", "C005", "HUN102", 2019);
INSERT INTO Teaches VALUES ("F001", "C001", "EST102", 2019);
INSERT INTO Teaches VALUES ("F002", "C001", "PHL120", 2019);
INSERT INTO Teaches VALUES ("F003", "C002", "CYL120", 2019);
INSERT INTO Teaches VALUES ("F004", "C002", "ESL120", 2019);
INSERT INTO Teaches VALUES ("F005", "C003", "ESL130", 2019);

-- Semester 3
INSERT INTO Teaches VALUES ("F006", "C003", "MAT203", 2019);
INSERT INTO Teaches VALUES ("F007", "C004", "CST201", 2019);
INSERT INTO Teaches VALUES ("F008", "C004", "CST203", 2019);
INSERT INTO Teaches VALUES ("F009", "C005", "CST205", 2019);
INSERT INTO Teaches VALUES ("F010", "C005", "EST200", 2019);
INSERT INTO Teaches VALUES ("F001", "C001", "HUT200", 2019);
INSERT INTO Teaches VALUES ("F002", "C001", "MCN201", 2019);
INSERT INTO Teaches VALUES ("F003", "C002", "CSL201", 2019);
INSERT INTO Teaches VALUES ("F004", "C002", "CSL203", 2019);

-- Semester 4
INSERT INTO Teaches VALUES ("F005", "C003", "MAT206", 2019);
INSERT INTO Teaches VALUES ("F006", "C003", "CST202", 2019);
INSERT INTO Teaches VALUES ("F007", "C004", "CST204", 2019);
INSERT INTO Teaches VALUES ("F008", "C004", "CST206", 2019);
INSERT INTO Teaches VALUES ("F009", "C005", "EST200", 2019);
INSERT INTO Teaches VALUES ("F010", "C005", "HUT200", 2019);
INSERT INTO Teaches VALUES ("F001", "C001", "MCN202", 2019);
INSERT INTO Teaches VALUES ("F002", "C001", "CSL202", 2019);
INSERT INTO Teaches VALUES ("F003", "C002", "CSL204", 2019);

-- Semester 5
INSERT INTO Teaches VALUES ("F004", "C002", "CST301", 2019);
INSERT INTO Teaches VALUES ("F005", "C003", "CST303", 2019);
INSERT INTO Teaches VALUES ("F006", "C003", "CST305", 2019);
INSERT INTO Teaches VALUES ("F007", "C004", "CST307", 2019);
INSERT INTO Teaches VALUES ("F008", "C004", "CST309", 2019);
INSERT INTO Teaches VALUES ("F009", "C005", "MCN301", 2019);
INSERT INTO Teaches VALUES ("F010", "C005", "CSL331", 2019);
INSERT INTO Teaches VALUES ("F001", "C001", "CSL333", 2019);

-- Semester 6
INSERT INTO Teaches VALUES ("F002", "C001", "CST302", 2019);
INSERT INTO Teaches VALUES ("F003", "C002", "CST304", 2019);
INSERT INTO Teaches VALUES ("F004", "C002", "CST306", 2019);
INSERT INTO Teaches VALUES ("F005", "C003", "SUB1", 2019);
INSERT INTO Teaches VALUES ("F006", "C003", "HUT300", 2019);
INSERT INTO Teaches VALUES ("F007", "C004", "CST308", 2019);
INSERT INTO Teaches VALUES ("F008", "C004", "CSL332", 2019);
INSERT INTO Teaches VALUES ("F009", "C005", "CSD334", 2019);

-- Semester 7
INSERT INTO Teaches VALUES ("F010", "C005", "CST401", 2019);
INSERT INTO Teaches VALUES ("F001", "C001", "SUB2", 2019);
INSERT INTO Teaches VALUES ("F002", "C001", "SUB3", 2019);
INSERT INTO Teaches VALUES ("F003", "C002", "MCN401", 2019);
INSERT INTO Teaches VALUES ("F004", "C002", "CSL411", 2019);
INSERT INTO Teaches VALUES ("F005", "C003", "CSQ413", 2019);
INSERT INTO Teaches VALUES ("F006", "C003", "CSD415", 2019);

-- Semester 8
INSERT INTO Teaches VALUES ("F007", "C004", "CST402", 2019);
INSERT INTO Teaches VALUES ("F008", "C004", "SUB4", 2019);
INSERT INTO Teaches VALUES ("F009", "C005", "SUB5", 2019);
INSERT INTO Teaches VALUES ("F010", "C005", "SUB6", 2019);
INSERT INTO Teaches VALUES ("F001", "C001", "CST404", 2019);
INSERT INTO Teaches VALUES ("F002", "C001", "CSD416", 2019);
