import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
const dataFile = '../../submissions.json';

const getSubmissions = () => {
    if (!fs.existsSync(dataFile)) {
        return [];
    }
    const data = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(data);
};

const saveSubmissions = (submissions) => {
    fs.writeFileSync(dataFile, JSON.stringify(submissions, null, 2));
};

export const getAllSubmissions = (req, res) => {
    const submissions = getSubmissions();
    res.json(submissions);
};

export const getSubmissionById = (req, res) => {
    const submissions = getSubmissions();
    const submission = submissions.find(sub => sub.id === req.params.id);
    if (submission) {
        res.json(submission);
    }
    else {
        res.status(404).send('Submission not found');
    }
};

export const createSubmission = (req, res) => {
    const submissions = getSubmissions();
    const newSubmission = Object.assign(Object.assign({ id: uuidv4() }, req.body), { timestamp: new Date() });
    submissions.push(newSubmission);
    saveSubmissions(submissions);
    res.status(201).json(newSubmission);
};

export const updateSubmission = (req, res) => {
    const submissions = getSubmissions();
    const index = submissions.findIndex(sub => sub.id === req.params.id);
    if (index !== -1) {
        const updatedSubmission = Object.assign(Object.assign(Object.assign({}, submissions[index]), req.body), { timestamp: new Date() });
        submissions[index] = updatedSubmission;
        saveSubmissions(submissions);
        res.json(updatedSubmission);
    }
    else {
        res.status(404).send('Submission not found');
    }
};

export const deleteSubmission = (req, res) => {
    let submissions = getSubmissions();
    const initialLength = submissions.length;
    submissions = submissions.filter(sub => sub.id !== req.params.id);
    if (submissions.length < initialLength) {
        saveSubmissions(submissions);
        res.status(204).send();
    }
    else {
        res.status(404).send('Submission not found');
    }
};
