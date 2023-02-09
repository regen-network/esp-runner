import GridLayout from "react-grid-layout";

export interface SchemaEditorProps {

}

export const SchemaEditor = ({}: SchemaEditorProps): JSX.Element => {
    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2, isDraggable: false },
        { i: "b", x: 1, y: 0, w: 1, h: 1, isDraggable: false },
        { i: "c", x: 1, y: 1, w: 1, h: 1, isDraggable: false}
    ];
    return (
        <GridLayout
            className="layout"
            layout={layout}
            cols={2}
            rowHeight={30}
            width={1200}
        >
            <div style={{borderColor:'black',borderWidth:1,borderStyle:'solid'}} key="a">a</div>
            <div key="b">b</div>
            <div key="c">c</div>
        </GridLayout>
    );
}
