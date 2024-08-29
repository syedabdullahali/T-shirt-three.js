import { useState } from 'react';
import { PhotoshopPicker } from 'react-color';

const ColorPicker = () => {
    const [value, setValue] = useState("#ffffff");

    function handleChange(color) {
        setValue(color);
    }

    function handleAccept(color) {
        setValue(color);
    }

    function handleCancel(color) {
        // console.log("Cancelled color selection",color);
        // Optionally handle cancelling behavior, such as reverting to previous color
    }

    return (
        <>
            <PhotoshopPicker  color={value} onChange={handleChange}  onAccept={handleAccept} onCancel={handleCancel} />
        </>
    );
}

export default ColorPicker;
