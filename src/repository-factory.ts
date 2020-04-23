import BusinessRepository from './repository/business-repositories/business-repository';

const repositories = {
    business: new BusinessRepository(),
};

export const RepositoryFactory = {
    get: (name) => repositories[name]
}