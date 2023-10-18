/* eslint-disable import/no-anonymous-default-export */
import { useCallback, useState, useEffect } from "react";
import dayjs from "dayjs";
import toArray from "dayjs/plugin/toArray";

export default ({
    limitMinDate         = null,
    startCurrentDate     = "",
    currentCalendarYear  = "",
    currentCalendarMonth = "",
    compareValue         = null,
    compareType          = null,
    handleSelectedDate   = () => {}
}) => {

    dayjs.extend(toArray);
    const today = dayjs().format('YYYY/M/D');
    const [ stateCurrentCalendarDays, setCurrentCalendarDays ] = useState([]);

    useEffect(() => {
        const prevMonthTotalDays = dayjs(`${currentCalendarYear}-${currentCalendarMonth}`).daysInMonth();
        const currentTotalDays   = dayjs(`${currentCalendarYear}-${currentCalendarMonth+1}`).daysInMonth();
        const currentStartDay    = Number(dayjs(`${currentCalendarYear}/${currentCalendarMonth+1}`).startOf('month').format('d'));
        const currentEndDay      = Number(dayjs(`${currentCalendarYear}/${currentCalendarMonth+1}`).endOf('month').format('d'));

        (async() => {

            const handleCurrentCalendarDays = ( startDate, endDate, month ) => {
                let days = [];
                const date = dayjs(`${currentCalendarYear}/${month}`).toArray();
                for(let i=startDate ; i<=endDate ; i++ ){
                    days = [ ...days, [`${date[0]}/${date[1]+1}/${i}`, i] ]
                }
                return days;
            }

            const handleCalendarDaysPromise = await Promise.all([
                handleCurrentCalendarDays( ((prevMonthTotalDays-currentStartDay)+1), prevMonthTotalDays, currentCalendarMonth ),
                handleCurrentCalendarDays( 1, currentTotalDays, (currentCalendarMonth+1) ),
                handleCurrentCalendarDays( 1, (7-(currentEndDay+1)), (currentCalendarMonth+2) )
            ]);

            const days = handleCalendarDaysPromise.reduce((acc, cur) => acc.concat(cur), []);

            setCurrentCalendarDays(days);
        })();

    }, [currentCalendarYear, currentCalendarMonth]);

    const checkActive = useCallback((itemDate) => {
        const itemDateToMs  = dayjs(itemDate).valueOf(); 
        const startDateToMs = dayjs(compareValue).valueOf();
        const endDateToMs   = dayjs(startCurrentDate).valueOf();
        if( compareType==="start" ){
            if( startDateToMs>=itemDateToMs && itemDateToMs>=endDateToMs ){
                return true;
            }
        }else if(compareType==="end"){
            if( startDateToMs<=itemDateToMs && itemDateToMs<=endDateToMs ){
                return true;
            }
        }
        return false;
    }, [compareType, compareValue, startCurrentDate]);

    const checkDisabled = useCallback((itemDate) => {
        const itemDateToMs  = dayjs(itemDate).valueOf(); 
        const startDateToMs = dayjs(compareValue).valueOf();

        if( limitMinDate ){
            const limitMinDateToMs = dayjs(limitMinDate).valueOf();
            return itemDateToMs<limitMinDateToMs? true:false;
            console.log(limitMinDateToMs);
        }

        if( compareType==="start" ){
            if( startDateToMs<itemDateToMs ){
                return true;
            }
        }else if(compareType==="end"){
            if( itemDateToMs<startDateToMs ){
                return true;
            }
        }
        return false;
    }, [limitMinDate, compareType, compareValue, startCurrentDate]);

    return(
        <div className='calendar-days-container'>
            {
                stateCurrentCalendarDays.map( day => {
                    return (
                        <div 
                            key           = {day[0]} 
                            className     = "calendar-days-item"
                            data-today    = {day[0]===today}
                            data-selected = {day[0]===startCurrentDate}
                            data-active   = {checkActive(day[0])}
                            data-disabled = {checkDisabled(day[0])}
                            onClick       = {handleSelectedDate.bind(this, day[0])}
                        >
                            <span>{day[1]}</span>
                        </div>
                    )
                })
            }
        </div>
    );
}