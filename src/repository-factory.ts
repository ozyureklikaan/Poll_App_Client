import BusinessRepository from './repository/business-repositories/business-repository';
import IpRepository from './repository/ip-repositories/ip-repository';

const repositories = {
    business: new BusinessRepository(),
    ip: new IpRepository()
};

export const RepositoryFactory = {
    get: (name) => repositories[name]
}