// Provide resolver functions for your schema fields

// const companies = require("companies");
const db = require("./../db");

const Query = {
  job: (root, args) => db.jobs.get(args.id),
  jobs: () => db.jobs.list(),
  company: (root, args) => db.companies.get(args.id)
};

const Mutation = {
  createJob: (root, { companyId, title, description }) => {
    return db.jobs.create({ companyId, title, description });
  }
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id)
};

const Job = {
  company: (job) => db.companies.get(job.companyId)
};

module.exports = { Query, Job, Company, Mutation };
