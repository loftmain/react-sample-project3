import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./DiaryItem.css";
import { getEmotionImgById } from "../util";
import React from "react";

const DiaryItem = ({ id, emotionId, content, date }) => {
    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/diary/${id}`);
    };
    const onEdit = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="DiaryItem">
            <div 
                onClick={goDetail}
                className={["img_section", `img_section_${emotionId}`].join(" ")}
            >
                <img alt={`emotion${emotionId}`} src={getEmotionImgById(emotionId)} />
            </div>
            <div onClick={goDetail} className="info_section">
                <div className="date_wrapper">
                    {new Date(parseInt(date)).toLocaleDateString()}
                </div>
                <div className="content_wrapper">{content.slice(0, 25)}</div>
            </div> 
            <div className="button_section">
                <Button onClick={onEdit} text={"수정하기"} />
            </div>
        </div>
    );
};
// DiaryItem 컴포넌트는 Context에서 데이터를 받거나 Props로 함수나 배열같은 참조형 값을 받지 않는다.
// 따라서 React.memo를 이용해 Props를 기준으로 메모이제이션을 하여 최적화 한다.
export default React.memo(DiaryItem);