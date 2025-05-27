import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';

type Props = {
    innerComponent?: React.ReactNode;
}
export default function SlideOver({ innerComponent = <Text>Empty Drawer</Text> }: Props) {
    const [open, setOpen] = React.useState(false);

    return (
        <Drawer
            open={open}
            onOpen={() => setOpen(true)
            }
            onClose={() => setOpen(false)}
            renderDrawerContent={() => innerComponent}
        >
            <View>
                <Button title="Open Drawer" onPress={() => setOpen(true)} />
            </View>
        </Drawer>
    );
}