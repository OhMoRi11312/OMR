import * as React from 'react';
import { Text } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    innerComponent?: React.ReactNode;
    mainContent?: React.ReactNode;
    drawerType?: any;
    backTouchable?: boolean;
    drawerStyle?: any;
    drawerPosition?: any;
}
export default function SlideOver({ open, setOpen, innerComponent = <Text>slide over content</Text>, mainContent = <Text>main content</Text>, drawerType = 'front', backTouchable = true, drawerStyle, drawerPosition = 'left' }: Props) {

    return (
        <Drawer
            open={open}
            drawerPosition={drawerPosition}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderDrawerContent={() => innerComponent}
            drawerType={drawerType}
            overlayStyle={(backTouchable ? {} : { zIndex: -1 })}
            drawerStyle={[drawerStyle, (backTouchable ? {} : { borderColor: '#cccccc', })]}
        >
            {mainContent}
        </Drawer>
    );
}
