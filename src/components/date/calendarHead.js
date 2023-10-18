/* eslint-disable import/no-anonymous-default-export */
import { memo } from 'react';

// Icons
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

export default memo(({
    currentCalendarYear  = "",
    currentCalendarMonth = "",
    handleArrow          = () => {}
}) => {
    return(
        <div className="calendar-head">
            <button onClick={handleArrow.bind(this, 'prev')}>
                <BiChevronLeft size="20px"/>
            </button>
            <div className="calendar-current-date">{`${currentCalendarYear}/${currentCalendarMonth+1}`}</div>
            <button onClick={handleArrow.bind(this, 'next')}>
                <BiChevronRight size="20px" />
            </button>
        </div>
    );
});