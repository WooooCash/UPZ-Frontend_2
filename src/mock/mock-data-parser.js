import { mock_data } from "./mock-data";

function getLocalityTypes() {
    let types = [];

    for (let type of mock_data) {
        types.push(type);
    }

    return types;
}

function getFields(localityType) {
    for (let type of mock_data) {
        if (type['typ'] === localityType && 'kierunki' in type) {
            let fields = [];
            for (let field of type['kierunki']) {
                fields.push(degree);
            }
            return fields;
        }
    }

    return null;
}

function getDegrees(localityType, fieldName) {
    let fields = getFields(localityType);

    if (fields != null && fields.length > 0) {
        for (let field of fields) {
            if (field['kierunek'] === fieldName && 'stopnie' in field) {
                let degrees = [];
                for (let degree of field['stopnie']) {
                    degrees.push(degree);
                }
                return degrees;
            }
        }
    }

    return null;
}

function getSemesters(localityType, fieldName, degreeName) {
    let degrees = getDegrees(localityType, fieldName);

    if (degrees != null && degrees.length > 0) {
        for (let degree of degrees) {
            if (degree['stopień'] === degreeName && 'semestry' in degree) {
                let semesters = [];
                for (let semester of degree['semestry']) {
                    semesters.push(semester);
                }
                return semesters;
            }
        }
    }

    return null;
}

function getSemester(localityType, fieldName, degreeName, semesterName) {
    let semesters = getSemesters(localityType, fieldName, degreeName);

    if (semesters != null && semesters.length > 0) {
        for (let semester of semesters) {
            if (semester['semestr'] === semesterName) {
                return semester;
            }
        }
    }

    return null;
}