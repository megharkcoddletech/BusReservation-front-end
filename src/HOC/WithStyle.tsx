import React from "react";

interface S {
    width: number;
    textAlign: string;
    backgroundColor: string;
    borderSpacing: number;
    borderRadius: number;
}

interface ElementProps {
    style: React.CSSProperties;
}

const WithStyle = (Element: React.FC<ElementProps>) => {
    return (props: S) => {
        const cardStyle: React.CSSProperties = {
            width: 400,
            textAlign: "center",
            backgroundColor: 'rgb(222, 208, 189)',
            borderSpacing: 30,
            borderRadius: 5
        };

        return (
            <div > 
                <Element style={cardStyle} {...props} />
            </div>
        );
    };
};

export default WithStyle;
