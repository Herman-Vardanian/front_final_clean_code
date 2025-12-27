import {Alert, Box, Button, Chip, Divider, Stack, Typography} from "@mui/material";

export default function AnswerRevealZone({
                              userAnswer,
                              originalAnswer,
                              onForceValidation,
                              onRetryLater,
                              disabled,
                          }: {
    userAnswer: string;
    originalAnswer: string;
    onForceValidation: () => void;
    onRetryLater: () => void;
    disabled: boolean;
}) {
    return (
        <Alert
            severity="warning"
            variant="outlined"
            sx={{borderRadius: 2}}
            icon={false}
        >
            <Stack spacing={1.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography fontWeight={700}>Not quite.</Typography>
                    <Chip size="small" label="Answer revealed"/>
                </Stack>

                <Divider/>

                <Box>
                    <Typography variant="caption" color="text.secondary">
                        Your answer
                    </Typography>
                    <Typography sx={{mt: 0.5}}>
                        {userAnswer?.trim() ? userAnswer : "—"}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="caption" color="text.secondary">
                        Original answer
                    </Typography>
                    <Typography sx={{mt: 0.5}} fontWeight={700}>
                        {originalAnswer}
                    </Typography>
                </Box>

                <Stack
                    direction={{xs: "column", sm: "row"}}
                    spacing={1}
                    sx={{pt: 0.5}}
                >
                    <Button
                        variant="contained"
                        color="success"
                        onClick={onForceValidation}
                        disabled={disabled}
                    >
                        Force validation
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={onRetryLater}
                        disabled={disabled}
                    >
                        Retry later
                    </Button>
                </Stack>

                <Typography variant="caption" color="text.secondary">
                    Force validation marks it as correct (moves up). Retry later marks it as incorrect (back to category
                    1).
                </Typography>
            </Stack>
        </Alert>
    );
}