const typeDefs = `
  type Profile {
    _id: String
    profileType: [String]
    name: String!
    gender: [String]
    genderOther: [String]
    ethnicityRace: [String]
    selfDefinedRoles: [String]
    foundingYear: String
    orgTypes: [String]
    startDate: String
    endDate: String
    interests: [String]
    about: String
    email: String
    phone: String
    website: String
    agent: String
    facebook: String
    twitter: String
    instagram: String
    social: String
    lat: String
    lon: String
    streetAddress: String
    locality: String
    administrativeArea: String
    country: String
    postalCode: String
  }

  type Show {
    _id: String
    name: String
    author: [Author]
    about: String
    interests: [String]
    country: [String]
    languages: [String]
  }

  type Author {
    name: String
    _id: String
  }

  # Responses
  type FindProfilesResponse {
    profiles: [Profile]
    total: Int
    skip: Int
    limit: Int
  }

  type FindShowsResponse {
    shows: [Show]
    total: Int
    skip: Int
    limit: Int
  }

  # Inputs
  input ProfileFiltersInput {
    # Searching on the name field is not case sensitive, matches partial words, and uses case folding for diacritics.
    name: String
    selfDefinedRoles: [String]
    interests: [String]
    orgTypes: [String]
    locality: [String]
    administrativeArea: [String]
    country: [String]
    postalCode: [String]
    gender: [String]
    ethnicityRace: [String]
  }

  input ShowFiltersInput {
    # Searching on the name field is not case sensitive, matches partial words, and uses case folding for diacritics.
    name: String
    author: AuthorInput
    interests: [String]
    country: [String]
    languages: [String]
  }

  input AuthorInput {
    # For filtering shows only the author _id is accepted
    #   - Only one author can be queried at a time
    _id: String
  }

  # The schema allows the following queries:
  type Query {
    # Find Profiles
    findProfiles(input: ProfileFiltersInput) : FindProfilesResponse
    # Find Shows
    findShows(input: ShowFiltersInput) : FindShowsResponse
  }
`;

module.exports = typeDefs;
