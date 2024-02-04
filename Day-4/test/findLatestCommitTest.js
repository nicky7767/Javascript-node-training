import { strictEqual, ok } from 'assert';
import { findLatestCommit } from '../app/part-1/findLatestCommit.js';

describe('findLatestCommit', () => {
    it('should return null for empty commit history', () => {
        const result = findLatestCommit([]);
        strictEqual(result, null);
    });

    it('should ignore entries with invalid date formats', () => {
        const commitHistoryWithInvalidDates = [
            { commitHash: 'a1', date: 'invalid-date' },
            { commitHash: 'b2', date: '2024-02-27T10:20:00.000Z' },
            { commitHash: 'c3', date: '2024-02-26T08:15:00.000Z' }
        ];
        const result = findLatestCommit(commitHistoryWithInvalidDates);
        ok(result);
        strictEqual(result.commitHash, 'b2');
    });

    it('should find the latest commit among valid commits', () => {
        const commitHistory = [
            { commitHash: 'a1', date: '2024-02-27T10:20:00.000Z' },
            { commitHash: 'b2', date: '2024-02-28T12:30:00.000Z' },
            { commitHash: 'c3', date: '2024-02-26T08:15:00.000Z' }
        ];
        const result = findLatestCommit(commitHistory);
        ok(result);
        strictEqual(result.commitHash, 'b2');
    });
});
