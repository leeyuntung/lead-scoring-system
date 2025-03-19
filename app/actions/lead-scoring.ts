"use server"

import {
  scoreLead,
  getTopContributingFactors,
  generateScoreExplanation,
  getLeadStatus,
  type LeadData,
  type ScoringWeights,
} from "@/lib/lead-scoring-algorithm"

export async function scoreLeadAction(leadData: LeadData, customWeights?: ScoringWeights) {
  try {
    // Score the lead with optional custom weights
    const { totalScore, categoryScores, featureScores } = scoreLead(leadData, customWeights)

    // Get top contributing factors
    const topFactors = getTopContributingFactors(featureScores, customWeights)

    // Generate explanation
    const explanation = generateScoreExplanation(totalScore, categoryScores, topFactors)

    // Determine lead status
    const status = getLeadStatus(totalScore)

    return {
      success: true,
      score: totalScore,
      status,
      categoryScores,
      topFactors: topFactors.slice(0, 5), // Return top 5 factors
      explanation,
      featureScores,
    }
  } catch (error) {
    console.error("Error in scoreLeadAction:", error)
    return {
      success: false,
      error: "Failed to score lead",
    }
  }
}

// Sample leads for testing
const sampleLeads: LeadData[] = [
  {
    id: "LEAD-1001",
    name: "Sarah Johnson",
    company: {
      name: "TechGrowth Inc.",
      size: 250,
      industry: "Technology",
      fundingStage: "Series B",
      annualRevenue: 15000000,
      growthRate: 35,
      technologyStack: ["AWS", "React", "Node.js", "MongoDB", "Kubernetes"],
    },
    contact: {
      position: "VP of Marketing",
      seniority: "VP",
      department: "Marketing",
      email: "sarah@techgrowth.com",
      linkedInUrl: "linkedin.com/in/sarahjohnson",
    },
    behavior: {
      websiteVisits: 8,
      contentDownloads: 3,
      emailEngagement: 0.7,
      socialEngagement: 0.5,
      eventAttendance: true,
    },
    source: "LinkedIn",
    dateAdded: "2023-05-15",
  },
  {
    id: "LEAD-1002",
    name: "Michael Chen",
    company: {
      name: "Innovate Solutions",
      size: 500,
      industry: "SaaS",
      fundingStage: "Series C+",
      annualRevenue: 50000000,
      growthRate: 25,
      technologyStack: ["GCP", "Angular", "Java", "PostgreSQL", "Docker"],
    },
    contact: {
      position: "CTO",
      seniority: "C-Level",
      department: "Technology",
      email: "michael@innovatesolutions.com",
      linkedInUrl: "linkedin.com/in/michaelchen",
    },
    behavior: {
      websiteVisits: 12,
      contentDownloads: 5,
      emailEngagement: 0.9,
      socialEngagement: 0.8,
      eventAttendance: true,
    },
    source: "Crunchbase",
    dateAdded: "2023-05-10",
  },
  {
    id: "LEAD-1003",
    name: "Jessica Williams",
    company: {
      name: "DataDrive Analytics",
      size: 120,
      industry: "Technology",
      fundingStage: "Series A",
      annualRevenue: 8000000,
      growthRate: 40,
      technologyStack: ["AWS", "Python", "TensorFlow", "SQL", "Tableau"],
    },
    contact: {
      position: "Director of Operations",
      seniority: "Director",
      department: "Operations",
      email: "jessica@datadrive.com",
      linkedInUrl: "linkedin.com/in/jessicawilliams",
    },
    behavior: {
      websiteVisits: 5,
      contentDownloads: 2,
      emailEngagement: 0.5,
      socialEngagement: 0.3,
      eventAttendance: false,
    },
    source: "Job Board",
    dateAdded: "2023-05-20",
  },
  {
    id: "LEAD-1004",
    name: "David Rodriguez",
    company: {
      name: "Cloud Systems Co.",
      size: 350,
      industry: "Technology",
      fundingStage: "Series B",
      annualRevenue: 20000000,
      growthRate: 30,
      technologyStack: ["Azure", "C#", ".NET", "SQL Server", "Microservices"],
    },
    contact: {
      position: "Head of Sales",
      seniority: "Director",
      department: "Sales",
      email: "david@cloudsystems.com",
      linkedInUrl: "linkedin.com/in/davidrodriguez",
    },
    behavior: {
      websiteVisits: 10,
      contentDownloads: 4,
      emailEngagement: 0.8,
      socialEngagement: 0.6,
      eventAttendance: true,
    },
    source: "LinkedIn",
    dateAdded: "2023-05-18",
  },
  {
    id: "LEAD-1005",
    name: "Emma Thompson",
    company: {
      name: "Growth Ventures",
      size: 50,
      industry: "Financial Services",
      fundingStage: "Seed",
      annualRevenue: 2000000,
      growthRate: 60,
      technologyStack: ["AWS", "React", "Node.js", "MongoDB"],
    },
    contact: {
      position: "CEO",
      seniority: "C-Level",
      department: "Executive",
      email: "emma@growthventures.com",
      linkedInUrl: "linkedin.com/in/emmathompson",
    },
    behavior: {
      websiteVisits: 15,
      contentDownloads: 6,
      emailEngagement: 0.95,
      socialEngagement: 0.9,
      eventAttendance: true,
    },
    source: "Crunchbase",
    dateAdded: "2023-05-12",
  },
]

// Function to get sample leads for demo purposes
export async function getSampleLeads() {
  return sampleLeads
}

// Function to score all sample leads
export async function scoreSampleLeads(customWeights?: ScoringWeights) {
  const scoredLeads = await Promise.all(
    sampleLeads.map(async (lead) => {
      const result = await scoreLeadAction(lead, customWeights)
      return {
        ...lead,
        score: result.score,
        status: result.status,
        categoryScores: result.categoryScores,
        topFactors: result.topFactors,
        explanation: result.explanation,
      }
    }),
  )

  return scoredLeads
}

