import React from "react";
import "./EmotionItem.css";

const EmotionItem = ({ id, img, name, onClick, isSelected }) => {
    const handleOnClick = () => {
        onClick(id);
    };

    return (
        <div 
            className={[
                "EmotionItem",
                isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`
            ].join(" ")} 
            onClick={handleOnClick}
        >
            <img alt={`emotion${id}`} src={img} />
            <span>{name}</span>
        </div>
    );
};
// 컴포넌트에서 기본으로 내보내는 값을 React.memo로 메모이제이션한다.
export default React.memo(EmotionItem);