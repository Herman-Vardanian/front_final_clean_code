import { useMemo, useState } from "react";
import { answerCard } from "../api/cardApi";
import { withToast } from "./error/errorWrapper";

import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AnswerRevealZone from "./AnswerRevealZone";

export default function CardAnswer({
                                       card,
                                       onAnswered,
                                   }: {
    card: any;
    onAnswered?: (cardId: string) => void;
}) {
    const [userAnswer, setUserAnswer] = useState("");
    const [showCorrection, setShowCorrection] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isCorrect = useMemo(() => {
        const ua = userAnswer.trim().toLowerCase();
        const ca = card.answer.trim().toLowerCase();
        return ua.length > 0 && ua === ca;
    }, [userAnswer, card.answer]);

    const finalize = () => {
        setUserAnswer("");
        setShowCorrection(false);
        onAnswered?.(card.id);
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        if (!userAnswer.trim()) {
            setShowCorrection(true);
            return;
        }

        // Correct answer
        if (isCorrect) {
            setIsSubmitting(true);

            const result = await withToast(answerCard(card.id, true), {
                successMessage: "Correct answer!",
            });

            setIsSubmitting(false);
            if (result.ok) finalize();
            return;
        }

        // Incorrect = show correction zone
        setShowCorrection(true);
    };

    const handleForceValidation = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const result = await withToast(answerCard(card.id, true), {
            successMessage: "Validated!",
        });

        setIsSubmitting(false);
        if (result.ok) finalize();
    };

    const handleRetryLater = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const result = await withToast(answerCard(card.id, false), {
            successMessage: "Saved. You’ll see it again!",
        });

        setIsSubmitting(false);
        if (result.ok) finalize();
    };

    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Stack spacing={2}>
                <Box>
                    <Typography variant="overline" color="text.secondary">
                        Question
                    </Typography>
                    <Typography variant="h6">{card.question}</Typography>
                </Box>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
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
                        sx={{ minWidth: 120 }}
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
