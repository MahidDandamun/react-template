interface Transition {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: number;
    idx: number;
    state: string;
    action: string;
    next_state: string;
    allowed: string;
    allow_self_approval: number;
    parent: string;
    parentfield: string;
    parenttype: string;
    doctype: string;
}

export const findNextStateForCurrentState = (transitions: Transition[], currentState: string): string | undefined => {
    const transition = transitions.find(transition => transition.state === currentState);
    return transition ? transition.next_state : undefined;
};

