import {observer} from 'mobx-react-lite';
import {Spinner} from 'react-bootstrap';

interface LoadingSpinnerProps {
    loading: boolean;
    size?: 'sm' | undefined;
}

export const LoadingSpinner = observer(
    (props: LoadingSpinnerProps): React.ReactElement<LoadingSpinnerProps> => {
        const {loading, size = 'sm'} = props;

        return loading ? (
            <Spinner size={size} as='span' animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </Spinner>
        ) : (
            <></>
        );
    }
);
