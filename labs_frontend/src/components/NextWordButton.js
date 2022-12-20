
import { Button } from '@mui/material'

const NextWordButton = ({word, onClick}) => (
    <Button
        onClick={onClick}
        variant="contained"
        style={{ textTransform: 'none' }}
    >
        {word}
    </Button>
)

export default NextWordButton
