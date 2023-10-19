/* eslint-disable import/no-anonymous-default-export */
import { memo, useRef, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import toArray from "dayjs/plugin/toArray";

// Components
import CalendarHead from './calendarHead';
import CalendarWeek from './calendarWeek';
import CalendarContainer from './calendarContainer';

// Icons
import { AiOutlineCalendar } from 'react-icons/ai';

import './public/style.scss';

export default memo(({
    limitMinDate = null, // 限制最小日期
    limitMaxDate = null,
    defaultValue = null,
    compareValue = null,
    compareType  = null,
    local        = 'en',
    handleChange = () => {}
}) => {

    const calendarRef = useRef(null);

    dayjs.extend(toArray);
    const initialDate = defaultValue? dayjs(defaultValue).format('YYYY/M/D'): dayjs().format('YYYY/M/D');
    const currentDateToArray = dayjs(initialDate).toArray();
    const [ stateStartCurrentDate    , setStartCurrentDate      ] = useState(initialDate);
    const [ stateCurrentCalendarYear , setCurrentCalendarYear   ] = useState(currentDateToArray[0]);
    const [ stateCurrentCalendarMonth, setCurrentCalendarMonth  ] = useState(currentDateToArray[1]);
    const [ stateDisplay, setDisplay ] = useState(false);

    const handleArrow = (type) => {
        let month = stateCurrentCalendarMonth+1;
        if(type==="prev"){
            month = month - 1;
        }else if(type==="next"){
            month = month + 1;
        }
        const date = dayjs(`${stateCurrentCalendarYear}/${month}`).format('YYYY/M');
        const dateToArray = dayjs(date).toArray();
        setCurrentCalendarYear(dateToArray[0]);
        setCurrentCalendarMonth(dateToArray[1]);
    }

    useEffect(() => {
        const closeDropdown = (e) => {
            const eventPath = e.path || e.composedPath();
            if( eventPath[0]!==calendarRef.current ){
                setDisplay(false);
            }
        }

        window.addEventListener('click', closeDropdown, true);
        return () => {
            window.removeEventListener('click', closeDropdown, false);
        }
    },[]);

    useEffect(() => {

    }, []);

    return(
        <div 
            ref       = {calendarRef}
            className = "date-wrap"
            onClick   = {() => setDisplay(prev => !prev)}
        >
            <div className = 'date-result-wrap'>
                <span className='date-value'>{stateStartCurrentDate}</span>
                <i>
                    <AiOutlineCalendar size="20px"/>
                </i>
            </div>
            <div 
                className    = 'calendar-days-wrap'
                data-display = {stateDisplay}
            >
                <CalendarHead 
                    currentCalendarYear  = {stateCurrentCalendarYear}
                    currentCalendarMonth = {stateCurrentCalendarMonth}
                    handleArrow          = {handleArrow}
                />
                <CalendarWeek 
                    local = {local}
                />
                <CalendarContainer
                    limitMinDate         = {limitMinDate}
                    limitMaxDate         = {limitMaxDate}
                    startCurrentDate     = {stateStartCurrentDate}
                    currentCalendarYear  = {stateCurrentCalendarYear}
                    currentCalendarMonth = {stateCurrentCalendarMonth}
                    compareValue         = {compareValue}
                    compareType          = {compareType}
                    handleSelectedDate   = {val => {
                        const dateToMs = dayjs(val).valueOf();
                        const dateChangeToMs = (date) => dayjs(date).valueOf();
                        if( limitMinDate || limitMaxDate ){
                            if( dateChangeToMs(limitMinDate)>dateToMs || dateChangeToMs(limitMaxDate)<dateToMs ){
                                return false;
                            }
                        }

                        if( compareType ){
                            const dateToMs = dayjs(val).valueOf();
                            const compareValueToMs = dayjs(compareValue).valueOf();

                            if( compareType==="start" && dateToMs<compareValueToMs ){
                                setStartCurrentDate(prev => {
                                    handleChange(val);
                                    return val;
                                });
                            }else if(compareType==="end" && dateToMs>compareValueToMs){
                                setStartCurrentDate(prev => {
                                    handleChange(val);
                                    return val;
                                });
                            }
                        }else{
                            setStartCurrentDate(prev => {
                                handleChange(val);
                                return val;
                            })
                        }
                    }}
                />
            </div>
        </div>
    );
});