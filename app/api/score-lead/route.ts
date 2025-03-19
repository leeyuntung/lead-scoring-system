import { type NextRequest, NextResponse } from "next/server"
import {
  scoreLead,
  getTopContributingFactors,
  generateScoreExplanation,
  getLeadStatus,
  type LeadData,
} from "@/lib/lead-scoring-algorithm"

export async function POST(request: NextRequest) {
  try {
    // Parse the lead data from the request
    const leadData: LeadData = await request.json()

    // Score the lead
    const { totalScore, categoryScores, featureScores } = scoreLead(leadData)

    // Get top contributing factors
    const topFactors = getTopContributingFactors(featureScores)

    // Generate explanation
    const explanation = generateScoreExplanation(totalScore, categoryScores, topFactors)

    // Determine lead status
    const status = getLeadStatus(totalScore)

    // Return the scoring results
    return NextResponse.json({
      success: true,
      score: totalScore,
      status,
      categoryScores,
      topFactors: topFactors.slice(0, 5), // Return top 5 factors
      explanation,
    })
  } catch (error) {
    console.error("Error scoring lead:", error)
    return NextResponse.json({ success: false, error: "Failed to score lead" }, { status: 500 })
  }
}

