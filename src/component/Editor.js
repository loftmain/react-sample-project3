import { useCallback, useEffect, useState } from "react";
import "./Editor.css";
import { emotionList, getFormattedDate } from "../util";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: "",
    });
    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, [initData]);
    const handleChangeDate = (e) => {
        setState({
            ...state, 
            date: e.target.value,
        });
    };
    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };
    const handleSubmit = () => {
        onSubmit(state);
    };
    const handleOnGoBack = () => {
        navigate(-1);
    };
    // useCallback으로 함수 handleChangeEmotion을 Editor 컴포넌트의 마운트 시점 이후에는
    // 다시 생성되지 않도록 메모이제이션함.
    const handleChangeEmotion = useCallback((emotionId) => {
        // setState에서 참조하는 state의 값이 마운트 이후 변하지 않기 때문에 State의 최신값을 유지할 수 
        //없어 정상적으로 상태가 업데이트 되지 않는다. -> 함수형 업데이트 사용
        setState((state) => ({
            ...state,
            emotionId,
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date}
                        onChange={handleChangeDate} />
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        <EmotionItem
                            key={it.id}
                            {...it}
                            onClick={handleChangeEmotion}
                            isSelected={state.emotionId === it.id}
                        />
                    ))}
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <textarea
                    placeholder="오늘은 어땠나요?"
                    value={state.content}
                    onChange={handleChangeContent}
                />
            </div>
            <div className="editor_section">
                <div className="editor_section bottom_section">
                    <Button text={"취소하기"} onClick={handleOnGoBack} />
                    <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};
export default Editor;
