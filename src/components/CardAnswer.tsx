import {useMemo, useState} from "react";
import {answerCard} from "../api/cardApi";
import {withToast} from "./error/errorWrapper";

import {
    Alert,
    Box,
    Button,
    Chip,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

export default function CardAnswer({
                                       card,
                                       onAnswered,
                                   }: {
    card: any;
    onAnswered?: () => void;
}) {
    const [userAnswer, setUserAnswer] = useState("");
    const [showCorrection, setShowCorrection] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isCorrect = useMemo(() => {
        const ua = (userAnswer ?? "").trim().toLowerCase();
        const ca = (card?.answer ?? "").trim().toLowerCase();
        return ua.length > 0 && ua === ca;
    }, [userAnswer, card?.answer]);

    const handleSubmit = async () => {
        if (isSubmitting) return;

        const ua = userAnswer.trim();
        if (!ua) {
            setShowCorrection(true);
            return;
        }

        // Correct → validate immediately
        if (isCorrect) {
            setIsSubmitting(true);
            const result = await withToast(answerCard(card.id, true), {
                successMessage: "Correct answer!",
            });
            setIsSubmitting(false);

            if (result.ok) {
                setUserAnswer("");
                setShowCorrection(false);
                onAnswered?.();
            }
            return;
        }

        setShowCorrection(true);
    };

    const handleForceValidation = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const result = await withToast(answerCard(card.id, true), {
            successMessage: "Validated!",
        });

        setIsSubmitting(false);

        if (result.ok) {
            setUserAnswer("");
            setShowCorrection(false);
            onAnswered?.();
        }
    };

    const handleRetryLater = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const result = await withToast(answerCard(card.id, false), {
            successMessage: "Saved. You’ll see it again!",
        });

        setIsSubmitting(false);

        if (result.ok) {
            setUserAnswer("");
            setShowCorrection(false);
            onAnswered?.();
        }
    };

    return (
        <Paper variant="outlined" sx={{p: 2, borderRadius: 2}}>
            <Stack spacing={2}>
                <Box>
                    <Typography variant="overline" color="text.secondary">
                        Question
                    </Typography>
                    <Typography variant="h6">{card.question}</Typography>
                </Box>

                <Stack direction={{xs: "column", sm: "row"}} spacing={1.5}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Your answer"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={isSubmitting}
                    />

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        sx={{minWidth: 120}}
                    >
                        Submit
                    </Button>
                </Stack>

                {showCorrection && (
                    <AnswerRevealZone
                        userAnswer={userAnswer}
                        originalAnswer={card.answer}
                        onForceValidation={handleForceValidation}
                        onRetryLater={handleRetryLater}
                        disabled={isSubmitting}
                    />
                )}
            </Stack>
        </Paper>
    );
}

function AnswerRevealZone({
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
