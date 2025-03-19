// Types for lead data
export type LeadData = {
  id: string
  name: string
  company: {
    name: string
    size: number
    industry: string
    fundingStage?: string
    annualRevenue?: number
    growthRate?: number
    technologyStack?: string[]
    location?: string
  }
  contact: {
    position: string
    seniority: "C-Level" | "VP" | "Director" | "Manager" | "Individual Contributor"
    department: string
    email?: string
    phone?: string
    linkedInUrl?: string
  }
  behavior?: {
    websiteVisits?: number
    contentDownloads?: number
    emailEngagement?: number
    socialEngagement?: number
    eventAttendance?: boolean
  }
  source: string
  dateAdded: string
}

// Types for scoring weights
export type ScoringWeights = {
  company: {
    size: number
    industry: number
    fundingStage: number
    annualRevenue: number
    growthRate: number
    technologyStack: number
    location: number
  }
  contact: {
    position: number
    seniority: number
    department: number
  }
  behavior: {
    websiteVisits: number
    contentDownloads: number
    emailEngagement: number
    socialEngagement: number
    eventAttendance: number
  }
}

// Default scoring weights
export const defaultWeights: ScoringWeights = {
  company: {
    size: 0.15,
    industry: 0.2,
    fundingStage: 0.1,
    annualRevenue: 0.15,
    growthRate: 0.15,
    technologyStack: 0.15,
    location: 0.1,
  },
  contact: {
    position: 0.3,
    seniority: 0.5,
    department: 0.2,
  },
  behavior: {
    websiteVisits: 0.2,
    contentDownloads: 0.25,
    emailEngagement: 0.25,
    socialEngagement: 0.2,
    eventAttendance: 0.1,
  },
}

// Industry relevance scoring
const industryRelevanceScores: Record<string, number> = {
  Technology: 1.0,
  SaaS: 1.0,
  "Financial Services": 0.9,
  Healthcare: 0.8,
  "E-commerce": 0.9,
  Manufacturing: 0.7,
  Education: 0.6,
  Retail: 0.7,
  Telecommunications: 0.8,
  Media: 0.7,
  "Real Estate": 0.6,
  Energy: 0.5,
  Transportation: 0.6,
  Hospitality: 0.5,
  Construction: 0.4,
  Agriculture: 0.3,
}

// Company size scoring
function scoreCompanySize(size: number): number {
  if (size >= 1000) return 1.0
  if (size >= 500) return 0.9
  if (size >= 200) return 0.8
  if (size >= 100) return 0.7
  if (size >= 50) return 0.6
  if (size >= 20) return 0.5
  if (size >= 10) return 0.4
  return 0.3
}

// Funding stage scoring
function scoreFundingStage(stage?: string): number {
  if (!stage) return 0.5

  switch (stage.toLowerCase()) {
    case "series c+":
    case "public":
      return 1.0
    case "series b":
      return 0.9
    case "series a":
      return 0.8
    case "seed":
      return 0.7
    case "pre-seed":
      return 0.6
    case "bootstrapped":
      return 0.5
    default:
      return 0.5
  }
}

// Annual revenue scoring
function scoreAnnualRevenue(revenue?: number): number {
  if (!revenue) return 0.5

  if (revenue >= 100000000) return 1.0 // $100M+
  if (revenue >= 50000000) return 0.9 // $50M+
  if (revenue >= 10000000) return 0.8 // $10M+
  if (revenue >= 5000000) return 0.7 // $5M+
  if (revenue >= 1000000) return 0.6 // $1M+
  if (revenue >= 500000) return 0.5 // $500K+
  if (revenue >= 100000) return 0.4 // $100K+
  return 0.3
}

// Growth rate scoring
function scoreGrowthRate(growthRate?: number): number {
  if (!growthRate) return 0.5

  if (growthRate >= 100) return 1.0 // 100%+ growth
  if (growthRate >= 50) return 0.9 // 50%+ growth
  if (growthRate >= 30) return 0.8 // 30%+ growth
  if (growthRate >= 20) return 0.7 // 20%+ growth
  if (growthRate >= 10) return 0.6 // 10%+ growth
  if (growthRate >= 5) return 0.5 // 5%+ growth
  if (growthRate >= 0) return 0.4 // Positive growth
  return 0.3 // Negative growth
}

// Technology stack scoring
function scoreTechnologyStack(stack?: string[]): number {
  if (!stack || stack.length === 0) return 0.5

  // Define relevant technologies that indicate a good fit
  const relevantTechnologies = [
    "aws",
    "azure",
    "gcp",
    "cloud",
    "react",
    "angular",
    "vue",
    "node",
    "javascript",
    "typescript",
    "python",
    "java",
    "kubernetes",
    "docker",
    "microservices",
    "ai",
    "machine learning",
    "data science",
    "big data",
    "saas",
    "api",
    "rest",
    "graphql",
  ]

  // Count how many relevant technologies are in the stack
  const matchCount = stack.filter((tech) =>
    relevantTechnologies.some((rt) => tech.toLowerCase().includes(rt.toLowerCase())),
  ).length

  // Score based on the number of matches
  if (matchCount >= 5) return 1.0
  if (matchCount >= 3) return 0.8
  if (matchCount >= 1) return 0.6
  return 0.4
}

// Seniority scoring
function scoreSeniority(seniority: string): number {
  switch (seniority) {
    case "C-Level":
      return 1.0
    case "VP":
      return 0.9
    case "Director":
      return 0.8
    case "Manager":
      return 0.6
    case "Individual Contributor":
      return 0.4
    default:
      return 0.5
  }
}

// Department relevance scoring
function scoreDepartment(department: string): number {
  const relevantDepartments: Record<string, number> = {
    Executive: 1.0,
    IT: 0.9,
    Technology: 0.9,
    Engineering: 0.9,
    Product: 0.9,
    Operations: 0.8,
    Marketing: 0.7,
    Sales: 0.7,
    Finance: 0.6,
    HR: 0.5,
    "Customer Support": 0.5,
    Legal: 0.4,
    Administrative: 0.3,
  }

  // Find the closest matching department
  for (const [key, value] of Object.entries(relevantDepartments)) {
    if (department.toLowerCase().includes(key.toLowerCase())) {
      return value
    }
  }

  return 0.5 // Default score if no match
}

// Position/title scoring
function scorePosition(position: string): number {
  // Keywords that indicate decision-making authority
  const decisionMakerKeywords = [
    "ceo",
    "cto",
    "cio",
    "cfo",
    "coo",
    "chief",
    "vp",
    "vice president",
    "head",
    "director",
    "president",
    "founder",
    "owner",
    "principal",
  ]

  // Keywords that indicate influence but not final authority
  const influencerKeywords = ["manager", "lead", "senior", "architect", "team lead", "supervisor"]

  const positionLower = position.toLowerCase()

  // Check for decision maker keywords
  for (const keyword of decisionMakerKeywords) {
    if (positionLower.includes(keyword)) {
      return 1.0
    }
  }

  // Check for influencer keywords
  for (const keyword of influencerKeywords) {
    if (positionLower.includes(keyword)) {
      return 0.7
    }
  }

  return 0.4 // Default for other positions
}

// Behavior scoring functions
function scoreWebsiteVisits(visits?: number): number {
  if (!visits) return 0
  if (visits >= 10) return 1.0
  if (visits >= 5) return 0.8
  if (visits >= 3) return 0.6
  if (visits >= 1) return 0.4
  return 0
}

function scoreContentDownloads(downloads?: number): number {
  if (!downloads) return 0
  if (downloads >= 3) return 1.0
  if (downloads >= 2) return 0.8
  if (downloads >= 1) return 0.6
  return 0
}

function scoreEmailEngagement(engagement?: number): number {
  if (!engagement) return 0
  if (engagement >= 0.8) return 1.0
  if (engagement >= 0.5) return 0.8
  if (engagement >= 0.3) return 0.6
  if (engagement >= 0.1) return 0.4
  return 0
}

function scoreSocialEngagement(engagement?: number): number {
  if (!engagement) return 0
  if (engagement >= 0.8) return 1.0
  if (engagement >= 0.5) return 0.8
  if (engagement >= 0.3) return 0.6
  if (engagement >= 0.1) return 0.4
  return 0
}

// Main scoring function
export function scoreLead(
  lead: LeadData,
  weights: ScoringWeights = defaultWeights,
): {
  totalScore: number
  categoryScores: {
    company: number
    contact: number
    behavior: number
  }
  featureScores: Record<string, number>
} {
  // Initialize scores
  let companyScore = 0
  let contactScore = 0
  let behaviorScore = 0
  let behaviorFactorsPresent = 0

  // Track individual feature scores for explanation
  const featureScores: Record<string, number> = {}

  // Score company factors
  const companySizeScore = scoreCompanySize(lead.company.size)
  featureScores["companySize"] = companySizeScore
  companyScore += companySizeScore * weights.company.size

  const industryScore = industryRelevanceScores[lead.company.industry] || 0.5
  featureScores["industry"] = industryScore
  companyScore += industryScore * weights.company.industry

  const fundingStageScore = scoreFundingStage(lead.company.fundingStage)
  featureScores["fundingStage"] = fundingStageScore
  companyScore += fundingStageScore * weights.company.fundingStage

  const revenueScore = scoreAnnualRevenue(lead.company.annualRevenue)
  featureScores["annualRevenue"] = revenueScore
  companyScore += revenueScore * weights.company.annualRevenue

  const growthRateScore = scoreGrowthRate(lead.company.growthRate)
  featureScores["growthRate"] = growthRateScore
  companyScore += growthRateScore * weights.company.growthRate

  const techStackScore = scoreTechnologyStack(lead.company.technologyStack)
  featureScores["technologyStack"] = techStackScore
  companyScore += techStackScore * weights.company.technologyStack

  // Score contact factors
  const positionScore = scorePosition(lead.contact.position)
  featureScores["position"] = positionScore
  contactScore += positionScore * weights.contact.position

  const seniorityScore = scoreSeniority(lead.contact.seniority)
  featureScores["seniority"] = seniorityScore
  contactScore += seniorityScore * weights.contact.seniority

  const departmentScore = scoreDepartment(lead.contact.department)
  featureScores["department"] = departmentScore
  contactScore += departmentScore * weights.contact.department

  // Score behavior factors if present
  if (lead.behavior) {
    if (lead.behavior.websiteVisits !== undefined) {
      const websiteScore = scoreWebsiteVisits(lead.behavior.websiteVisits)
      featureScores["websiteVisits"] = websiteScore
      behaviorScore += websiteScore * weights.behavior.websiteVisits
      behaviorFactorsPresent++
    }

    if (lead.behavior.contentDownloads !== undefined) {
      const downloadsScore = scoreContentDownloads(lead.behavior.contentDownloads)
      featureScores["contentDownloads"] = downloadsScore
      behaviorScore += downloadsScore * weights.behavior.contentDownloads
      behaviorFactorsPresent++
    }

    if (lead.behavior.emailEngagement !== undefined) {
      const emailScore = scoreEmailEngagement(lead.behavior.emailEngagement)
      featureScores["emailEngagement"] = emailScore
      behaviorScore += emailScore * weights.behavior.emailEngagement
      behaviorFactorsPresent++
    }

    if (lead.behavior.socialEngagement !== undefined) {
      const socialScore = scoreSocialEngagement(lead.behavior.socialEngagement)
      featureScores["socialEngagement"] = socialScore
      behaviorScore += socialScore * weights.behavior.socialEngagement
      behaviorFactorsPresent++
    }

    if (lead.behavior.eventAttendance !== undefined) {
      const eventScore = lead.behavior.eventAttendance ? 1.0 : 0
      featureScores["eventAttendance"] = eventScore
      behaviorScore += eventScore * weights.behavior.eventAttendance
      behaviorFactorsPresent++
    }
  }

  // Normalize behavior score if any factors are present
  if (behaviorFactorsPresent > 0) {
    behaviorScore = (behaviorScore / behaviorFactorsPresent) * 5 // Scale back up to match other categories
  }

  // Calculate category weights based on available data
  let companyWeight = 0.4
  let contactWeight = 0.4
  let behaviorWeight = 0.2

  // If no behavior data, redistribute the weight
  if (behaviorFactorsPresent === 0) {
    companyWeight = 0.5
    contactWeight = 0.5
    behaviorWeight = 0
  }

  // Calculate total score (0-100 scale)
  const totalScore = Math.round(
    (companyScore * companyWeight + contactScore * contactWeight + behaviorScore * behaviorWeight) * 100,
  )

  return {
    totalScore,
    categoryScores: {
      company: Math.round(companyScore * 100),
      contact: Math.round(contactScore * 100),
      behavior: Math.round(behaviorScore * 100),
    },
    featureScores,
  }
}

// Function to determine lead status based on score
export function getLeadStatus(score: number): "qualified" | "pending" | "unqualified" {
  if (score >= 80) return "qualified"
  if (score >= 50) return "pending"
  return "unqualified"
}

// Function to get top contributing factors
export function getTopContributingFactors(
  featureScores: Record<string, number>,
  weights: ScoringWeights = defaultWeights,
): { factor: string; impact: number }[] {
  const factors: { factor: string; impact: number }[] = []

  // Map feature names to readable labels
  const featureLabels: Record<string, string> = {
    companySize: "Company Size",
    industry: "Industry Relevance",
    fundingStage: "Funding Stage",
    annualRevenue: "Annual Revenue",
    growthRate: "Growth Rate",
    technologyStack: "Technology Stack",
    position: "Job Position",
    seniority: "Seniority Level",
    department: "Department",
    websiteVisits: "Website Visits",
    contentDownloads: "Content Downloads",
    emailEngagement: "Email Engagement",
    socialEngagement: "Social Media Engagement",
    eventAttendance: "Event Attendance",
  }

  // Calculate impact for each feature
  for (const [feature, score] of Object.entries(featureScores)) {
    let weight = 0

    // Determine the weight based on the feature category
    if (
      ["companySize", "industry", "fundingStage", "annualRevenue", "growthRate", "technologyStack"].includes(feature)
    ) {
      weight = weights.company[feature as keyof typeof weights.company]
    } else if (["position", "seniority", "department"].includes(feature)) {
      weight = weights.contact[feature as keyof typeof weights.contact]
    } else if (
      ["websiteVisits", "contentDownloads", "emailEngagement", "socialEngagement", "eventAttendance"].includes(feature)
    ) {
      weight = weights.behavior[feature as keyof typeof weights.behavior]
    }

    const impact = score * weight * 100
    factors.push({
      factor: featureLabels[feature] || feature,
      impact: Math.round(impact),
    })
  }

  // Sort by impact (highest first) and take top factors
  return factors.sort((a, b) => b.impact - a.impact)
}

// Function to generate lead score explanation
export function generateScoreExplanation(
  score: number,
  categoryScores: { company: number; contact: number; behavior: number },
  topFactors: { factor: string; impact: number }[],
): string {
  const status = getLeadStatus(score)
  const topPositiveFactors = topFactors.slice(0, 3)

  let explanation = `This lead has been ${status} with a score of ${score}/100. `

  explanation += `The score is based on company factors (${categoryScores.company}/100), `
  explanation += `contact information (${categoryScores.contact}/100)`

  if (categoryScores.behavior > 0) {
    explanation += `, and behavioral data (${categoryScores.behavior}/100)`
  }

  explanation += `. `

  if (topPositiveFactors.length > 0) {
    explanation += `The top contributing factors are: `
    explanation += topPositiveFactors.map((f) => `${f.factor} (impact: ${f.impact})`).join(", ")
    explanation += `.`
  }

  return explanation
}

