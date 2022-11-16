import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';

export default function addExpenses({opened, setOpened}: { opened: boolean, setOpened: (opened: (o: any) => boolean) => void }) {


    return (
        <>
            <Modal
                opened={opened}
                onClose={() =>  setOpened((o) => !o)}
                title="Introduce yourself!"
            >
                {/* Modal content */}
            </Modal>
        </>
    );
}