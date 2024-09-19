import userRepository from '../repositories/userRepositories';

const getAllUsers = () => {
  return userRepository.findAll();
};

export default { getAllUsers };
