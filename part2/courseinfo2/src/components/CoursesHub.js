import React from 'react';
import Course from './Course';
import Header1 from './Header1';

const CoursesHub = ({name, courses}) => {
    return (
        <>
            <Header1 name = {name}/>
            {courses.map((course) => <Course key={course.id} course={course}/>)}
        </>
    )
}
export default CoursesHub