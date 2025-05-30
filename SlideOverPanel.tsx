import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    innerComponent?: React.ReactNode;
}
export default function SlideOver({ open, setOpen, innerComponent = <Text>Hello</Text> }: Props) {

    return (
        <Drawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderDrawerContent={() => innerComponent}
        >
            <View>
                <Button title="Open Drawer" onPress={() => setOpen(true)} />
            </View>
        </Drawer>
    );
}   
