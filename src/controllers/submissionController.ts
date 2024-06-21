import { Request, Response } from 'express';
import { Submission } from '../models/submssion.js';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const dataFile = 'submissions.json';

const getSubmissions = (): Submission[] => {
  if (!fs.existsSync(dataFile)) {
    return [];
  }
  const data = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(data);
};

const saveSubmissions = (submissions: Submission[]) => {
  fs.writeFileSync(dataFile, JSON.stringify(submissions, null, 2));
};

export const getAllSubmissions = (req: Request, res: Response) => {
  const submissions = getSubmissions();
  res.json(submissions);
};

export const getSubmissionById = (req: Request, res: Response) => {
  const submissions = getSubmissions();
  const submission = submissions.find(sub => sub.id === req.params.id);
  if (submission) {
    res.json(submission);
  } else {
    res.status(404).send('Submission not found');
  }
};

export const createSubmission = (req: Request, res: Response) => {
  const submissions = getSubmissions();
  const newSubmission: Submission = {
    id: uuidv4(),
    ...req.body,
    timestamp: new Date()
  };
  submissions.push(newSubmission);
  saveSubmissions(submissions);
  res.status(201).json(newSubmission);
};

export const updateSubmission = (req: Request, res: Response) => {
  const submissions = getSubmissions();
  const index = submissions.findIndex(sub => sub.id === req.params.id);
  if (index !== -1) {
    const updatedSubmission = {
      ...submissions[index],
      ...req.body,
      timestamp: new Date()
    };
    submissions[index] = updatedSubmission;
    saveSubmissions(submissions);
    res.json(updatedSubmission);
  } else {
    res.status(404).send('Submission not found');
  }
};

export const deleteSubmission = (req: Request, res: Response) => {
  let submissions = getSubmissions();
  const initialLength = submissions.length;
  submissions = submissions.filter(sub => sub.id !== req.params.id);
  if (submissions.length < initialLength) {
    saveSubmissions(submissions);
    res.status(204).send();
  } else {
    res.status(404).send('Submission not found');
  }
};
