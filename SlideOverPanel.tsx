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
}
export default function SlideOver({ open, setOpen, innerComponent = <Text>slide over content</Text>, mainContent = <Text>main content</Text>, drawerType = 'front', backTouchable = true, drawerStyle }: Props) {

    return (
        <Drawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderDrawerContent={() => innerComponent}
            drawerType={drawerType}
            overlayStyle={(backTouchable ? {} : { zIndex: -1 })}
            drawerStyle={[drawerStyle, (backTouchable ? {} : { borderColor: '#cccccc', borderRightWidth: 1, borderTopRightRadius: 25, borderBottomRightRadius: 25, })]}
        >
            {mainContent}
        </Drawer>
    );
}
