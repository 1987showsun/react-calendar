/* eslint-disable import/no-anonymous-default-export */
import { useMemo } from "react";

const weeksLang = {
    "en": [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
    "zh": [ "日", "一", "二", "三", "四", "五", "六" ]
}

export default ({
    local = "en"
}) => {

    const setWeek = useMemo(() => {
        const currentLocalWeeks = weeksLang[ local ] || weeksLang['en'];
        const weeks = [];
        currentLocalWeeks.forEach( item => {
            weeks.push(
                <div key={item} className="calendar-days-item">{ item }</div>
            );
        });

        return weeks;
    }, [local]);

    return(
        <div className="calendar-week-wrap">
            { setWeek }
        </div>
    );
}