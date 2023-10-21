import styles from './CommicBubble.module.css';

const CommicBubble = ({children}) => {
    return(
        <div className={styles.bubble}>{children}</div>
    )
};

export default CommicBubble;