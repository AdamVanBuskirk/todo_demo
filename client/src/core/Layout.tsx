import * as React from 'react';
/*
interface State {
    children?: React.ReactNode;
}*/

interface ComponentProps {
  children ?: React.ReactNode;
}

type Props = ComponentProps 

class Layout extends React.PureComponent<Props> {
/*
    constructor(props: Props) {
        super(props);
        this.state = {
            children: null
        }
    }*/

    public render() {
        return (
          <div>
            {this.props.children}
          </div>
        );
    }
}

export default Layout; 