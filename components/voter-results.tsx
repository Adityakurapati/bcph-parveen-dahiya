'use client';

import { Voter } from '@/hooks/use-voter-search';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VoterResultsProps {
  voters: Voter[];
  onSelectVoter: (voter: Voter) => void;
  onClose: () => void;
}

export function VoterResults({ voters, onSelectVoter, onClose }: VoterResultsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Found {voters.length} Record{voters.length !== 1 ? 's' : ''}
            </h2>
            <button
              onClick={onClose}
              className="text-2xl text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <p className="text-muted-foreground mb-6">
            Multiple records found for this name. Please select one:
          </p>

          <div className="space-y-3">
            {voters.map((voter) => (
              <button
                key={voter.sr_no}
                onClick={() => onSelectVoter(voter)}
                className="w-full text-left p-4 border border-border rounded-lg hover:border-primary hover:bg-accent/5 transition-all duration-300 hover:shadow-md group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {voter.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Serial No: <span className="font-mono font-semibold text-foreground">{voter.sr_no}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enrolment: <span className="font-mono font-semibold text-foreground">{voter.enrolment_no}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {voter.address}
                    </p>
                    {voter.place_of_voting && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Voting Place: <span className="font-semibold text-foreground">{voter.place_of_voting}</span>
                      </p>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <span className="text-sm font-semibold">→</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <Button
            onClick={onClose}
            variant="outline"
            className="w-full mt-6"
          >
            Close
          </Button>
        </div>
      </Card>
    </div>
  );
}
